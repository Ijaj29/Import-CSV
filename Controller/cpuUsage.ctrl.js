// utils/cpuUsage.js
const os = require("os");
const pidusage = require("pidusage");
const { exec } = require('child_process');

// Function to calculate CPU utilization using the os module
function calculateCPUUsage() {
  const cpus = os.cpus();
  let user = 0;
  let nice = 0;
  let sys = 0;
  let idle = 0;
  let irq = 0;
  let total = 0;

  cpus.forEach((cpu) => {
    user += cpu.times.user;
    nice += cpu.times.nice;
    sys += cpu.times.sys;
    idle += cpu.times.idle;
    irq += cpu.times.irq;
  });

  total = user + nice + sys + idle + irq;

  return {
    idle: idle / total,
    usage: 1 - idle / total,
  };
}

// Function to get CPU usage using pidusage
function getCPUUsage(callback) {
  pidusage(process.pid, (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }
    callback(stats.cpu.toFixed(2));
  });
}

// Function to start monitoring CPU usage at regular intervals
function startMonitoring(interval = 1000) {
  setInterval(() => {
    // Option 1: Using os module
    // const { usage } = calculateCPUUsage();
    // console.log(`CPU Usage 1 : ${(usage * 100).toFixed(2)}%`);

    // Option 2: Using pidusage module
    getCPUUsage((cpuUsage) => {
      console.log(`CPU Usage 2 : ${cpuUsage}%`);
      if (cpuUsage > 3) {
        console.log(`CPU usage exceeded 3%. Restarting server...`);

        // Command to restart the server using PM2
        exec("pm2 restart Backend", (error, stdout, stderr) => {
          if (error) {
            console.error(`Error restarting server: ${error.message}`);
            return;
          }
          console.log(`Server restarted successfully: ${stdout}`);
        });
      }
    });
  }, interval);
}

module.exports = { startMonitoring };
