let url = "https://www.bungie.net/Platform/Destiny2/";

const allTeams = [
  [
    { type: "3", id: "4611686018482605597", name: "Butters" },
    { type: "1", id: "4611686018456289666", name: "Frzn" },
    { type: "3", id: "4611686018472105534", name: "Razorcut" },
    { type: "3", id: "4611686018468117711", name: "Ksetcs" },
    { type: "3", id: "4611686018504800722", name: "Apple_64" },
    { type: "1", id: "4611686018430872228", name: "Reopss" },
  ],
  [
    { type: "3", id: "4611686018467847265", name: "AlexK" },
    { type: "1", id: "4611686018434321149", name: "Action Jackson" },
    { type: "1", id: "4611686018429882221", name: "Gally" },
    { type: "1", id: "4611686018432209461", name: "ThwartGolf" },
    { type: "1", id: "4611686018429879860", name: "AsianSpecialist" },
    { type: "1", id: "4611686018432622059", name: "Grizzly" },
  ],
  [
    { type: "1", id: "4611686018429860638", name: "Sherpa Mind" },
    { type: "1", id: "4611686018429810474", name: "BonaFideHiro" },
    { type: "1", id: "4611686018430335839", name: "Revenant" },
    { type: "1", id: "4611686018429826794", name: "Fletcher117" },
    { type: "1", id: "4611686018433084550", name: "Mm2mmrimmer" },
    { type: "1", id: "4611686018429541409", name: "Jarv" },
  ],
  [
    { type: "1", id: "4611686018473082405", name: "Miss" },
    { type: "2", id: "4611686018473387231", name: "Fangz" },
    { type: "1", id: "4611686018449648082", name: "Haxx" },
    { type: "1", id: "4611686018451363932", name: "ShieldMaiden" },
    { type: "3", id: "4611686018484174236", name: "TechStomper" },
  ],
  [
    { type: "2", id: "4611686018512016613", name: "Mytho" },
    { type: "1", id: "4611686018433696774", name: "Shadowstep" },
    { type: "3", id: "4611686018504265789", name: "Blue" },
    { type: "3", id: "4611686018530253396", name: "JUICER" },
    { type: "1", id: "4611686018461669902", name: "Cryo" },
    { type: "1", id: "4611686018464050897", name: "Caracals" },
  ],
  [
    { type: "1", id: "4611686018430246885", name: "Qanzmoto" },
    { type: "3", id: "4611686018496005145", name: "HarDJunk" },
    { type: "2", id: "4611686018443998952", name: "Lover" },
    { type: "1", id: "4611686018445376126", name: "Instinct" },
    { type: "3", id: "4611686018495414673", name: "Kalista" },
    { type: "2", id: "4611686018458773501", name: "Cirisly" },
  ],
  [
    { type: "1", id: "4611686018488188877", name: "Psalms" },
    { type: "1", id: "4611686018432535713", name: "GoofyGoose" },
    { type: "3", id: "4611686018513091271", name: "Mufzu" },
    { type: "3", id: "4611686018503530307", name: "Ruby" },
    { type: "1", id: "4611686018444819810", name: "Arb" },
    { type: "1", id: "4611686018444807257", name: "Chief" },
  ],
];

function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("score-table");
  switching = true;

  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      if (Number(x.innerText) < Number(y.innerText)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function run() {
  let input = document.getElementById("key");
  console.log(`NEW RUN`);
  console.log(``);

  if (input.value == null || input.value == "") {
    console.log("No Key");
    return;
  }

  input.classList.add("hidden");
  let loadedScores = document.getElementsByClassName("score");
  for (i = 0; i < loadedScores.length; i++) {
    loadedScores[i].innerHTML = "loading...";
  }

  function getData(object) {
    const apiUrl = `${url}${object.type}/Profile/${object.id}?components=1100`;

    const requestOptions = {
      method: "GET",
      headers: {
        "X-API-Key": input.value,
      },
    };

    return fetch(apiUrl, requestOptions).then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${object.name}`);
      }
      return response.json();
    });
  }

  function getScores(team, count) {
    let score = 0;
    let daily = 0;
    let currentTeam = `team${count}`;
    let currentDaily = `team${count}d`;
    let scoreDisplay = document.getElementById(currentTeam);
    let dailyDisplay = document.getElementById(currentDaily);

    Promise.all(team.map((object) => getData(object)))
      .then((results) => {
        console.log(`------ ${currentTeam} ------`);
        results.forEach((player, i) => {
          let curScore =
            player.Response.metrics.data.metrics[2330926603].objectiveProgress
              .progress;

          let dailyScore =
            player.Response.metrics.data.metrics[2871558814].objectiveProgress
              .progress;

          score = score + curScore;
          daily = daily + dailyScore;

          console.log(`${team[i].name} -> ${curScore} | ${dailyScore}`);
        });
        scoreDisplay.innerHTML = score;
        dailyDisplay.innerHTML = daily;
        sortTable();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  allTeams.forEach((team, i) => {
    getScores(team, `${i + 1}`);
  });
}
