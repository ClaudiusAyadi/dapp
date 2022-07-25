const MoodContractAddress = "0x4bc161ae372d664a7626fa496012754eb5765122";
const MoodContractABI = [
  {
    inputs: [],
    name: "getMood",
    outputs: [
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
        name: "_mood",
        type: "string",
      },
    ],
    name: "setMood",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
let MoodContract;

let signer;
const provider = new ethers.providers.Web3Provider(window.ethereum, "ropsten");
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    MoodContract = new ethers.Contract(
      MoodContractAddress,
      MoodContractABI,
      signer
    );
  });
});

async function getMood() {
  getMoodPromise = MoodContract.getMood();
  let Mood = await getMoodPromise;
  console.log(Mood);
  alert(Mood);
}

async function setMood() {
  let mood = document.getElementById("mood").value;
  setMoodPromise = MoodContract.setMood(mood);
  await setMoodPromise;
}
