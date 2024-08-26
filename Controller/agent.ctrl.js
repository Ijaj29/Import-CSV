const path = require("path");
const { Worker } = require("worker_threads");

const agentCtrl = {

  addAgent: async (req, res) => {
    console.log("req :", req.file);

    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded");
      }

      // Create a new worker to process the file
      const worker = new Worker(path.join(__dirname, "../Services/worker.js"), {
        workerData: {
          fileBuffer: req.file.buffer,
          fileType: req.file.mimetype,
        },
      });

      worker.on("message", (msg) => {
        if (!res.headersSent) {
          res.status(200).send(msg); // Ensure headers aren't already sent
        }
      });

      worker.on("error", (error) => {
        if (!res.headersSent) {
          res.status(500).send("An error occurred while processing the file");
        }
      });

      worker.on("exit", (code) => {
        if (code !== 0 && !res.headersSent) {
          res.status(500).send(`Worker stopped with exit code ${code}`);
        }
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },
};

module.exports = agentCtrl;
