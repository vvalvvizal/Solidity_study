window.addEventListener("load", async () => {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
  console.log("using web3 provider");

  web3.eth.net
    .isListening()
    .then(() => console.log("Web3 is connected to Ganache"))
    .catch((err) => console.error("Error connecting to Ganache:", err));

  const accounts = await web3.eth.getAccounts();
  web3.eth.defaultAccount = accounts[0];
  console.log("Set the default account: ", accounts[0]);

  var StudentABI = [
    {
      inputs: [],
      name: "getStudent",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "fname",
          type: "string",
        },
        {
          internalType: "string",
          name: "lname",
          type: "string",
        },
        {
          internalType: "string",
          name: "dob",
          type: "string",
        },
      ],
      name: "setStudent",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  StudentDetails = new web3.eth.Contract(
    StudentABI,
    "0x358AA13c52544ECCEF6B0ADD0f801012ADAD5eE3"
  );
  refresh();
});

function refresh() {
  StudentDetails.methods.getStudent().call((error, result) => {
    if (!error) {
      $("#instructor").html(
        "Enrolled " + result[0] + " " + result[1] + " with DOB " + result[2]
      );
      console.log(result);
    } else {
      console.log(error);
    }
  });
}

function Update() {
  StudentDetails.methods
    .setStudent($("#fname").val(), $("#lname").val(), $("#dob").val())
    .send({ from: web3.eth.defaultAccount }, (error, transactionHash) => {
      if (!error) {
        console.log(transactionHash);
      } else {
        console.log(error);
      }
    });
}
