/* eslint-disable @typescript-eslint/no-var-requires */
const config = require("config");
const exec = require("child_process").exec;
const port = config.get("server_port");

console.log(`port:${port} のプロセスを強制終了します`);
exec(`lsof -ti:${port}`, (err: any, stdout: any) => {
  if (err) {
    console.log(`port:${port}でプロセスは起動していません`);
    return;
  }
  const pid = new String(stdout).trim();
  console.log(`プロセスID ${pid}を強制終了します`);

  exec(` kill ${pid}`, (err: any, stdout: any, stderr: any) => {
    if (err) console.log(err);
    console.log(stdout);
    console.log("強制終了完了しました。");
  });
});
