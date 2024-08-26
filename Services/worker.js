const { parentPort, workerData } = require("worker_threads");
const xlsx = require("xlsx");
const { MongoClient } = require("mongodb");
const iconv = require("iconv-lite");
const Papa = require("papaparse");

// Function to process the uploaded file
async function processFile(buffer, fileType) {
  let data;

  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  // Parse the XLSX or CSV file based on the file type
  if (fileType == "text/csv") {
    // const csvString = buffer.toString('utf-8');
    const csvString = iconv.decode(buffer, "utf-8"); // Adjust the encoding if needed

    // Parse CSV string to JSON
    const parsedData = Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
    });

    data = parsedData.data; // This is the JSON representation of CSV data
  } else if (
    fileType ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    const workbook = xlsx.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  } else {
    throw new Error("Unsupported file type");
  }

  try {
    await client.connect();
    const db = client.db("Policy");
    for (const dataArray of data) {
      const {
        agent,
        company_name,
        category_name,
        policy_number,
        policy_start_date,
        policy_end_date,
        firstname,
        dob,
        address,
        phone,
        state,
        zip,
        email,
        gender,
        userType,
        account_name,
      } = dataArray;

      // Prepare the data for each collection
      const agentData = { agent };
      const userData = {
        firstname,
        dob,
        address,
        phone,
        state,
        zip,
        email,
        gender,
        userType,
      };
      const policyInfoData = {
        policy_number,
        policy_start_date: new Date(policy_start_date),
        policy_end_date: new Date(policy_end_date),
        category_name,
        company_name,
        firstname,
      };

      const policyCarrierData = { company_name };
      const policyCategoryData = { category_name };
      const userAccData = { account_name };

      // Insert data into the respective collections
      await db.collection("agents").insertOne(agentData);
      await db.collection("users").insertOne(userData);
      await db.collection("policyinfos").insertOne(policyInfoData);
      await db.collection("policycarriers").insertOne(policyCarrierData);
      await db.collection("policycategorys").insertOne(policyCategoryData);
      await db.collection("useraccs").insertOne(userAccData);
    }

    return { message: "File uploaded and data inserted successfully"};
  } catch (error) {
    return "Error occurred while inserting data:";
  }
}

// Execute the file processing function
processFile(workerData.fileBuffer, workerData.fileType)
  .then((result) => {
    parentPort.postMessage(result);
  })
  .catch((error) => {
    parentPort.postMessage({ error: error.message });
  });
