//runs api call once the web page is loaded
$(document).ready(async function(){
   apiCall();
})


// asynchronous function that will fetch the csv data from the url
async function apiCall(){
    console.log("fetch sent");
    var data = fetch('https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonEC2/current/index.csv').then(response => {
       return response.text();
    }).then(data => {
        console.log("fetch complete");
        //call function to change csv to JSON
        csvJSON(data);
    });
}

function csvJSON(csv){
    
    // split csv into array off of newlines
  var lines=csv.split("\n");

  var result = [];

    // skip first 5 lines of csv as it's not real data
  var headers=lines[5].split(",");
    //replace the double escape quotes 
    for(i=0;i < headers.length;i++){
        headers[i] = headers[i].replace(/\"/g, "");
    }
    //loop through array of csv data
  for(var i=6;i<lines.length;i++){

      var obj = {};
      var obj2 = {};
      var currentline=lines[i].split(",");
      // Object creation looop
          //per iteration i, loop through each key(header) and set it's value 
      for(var j=0;j<headers.length;j++){
          //fail safe
          if(currentline[j]!== undefined) {
          obj[headers[j]] = currentline[j].replace(/\"/g, "");  //remove double escape quotes
          } else {
              continue;
          }
      }
      // filtering logic checking the obj created to see if it has desired results
      if (obj["Location"] == "US East (N. Virginia)" && obj["CapacityStatus"] !== "Used" && obj["Tenacy"] !== "Shared" && obj["Pre Installed S/W"] == "NA" && obj["License Model"] == "No License required"){
          //if successful, set the desired key/values
         console.log("filtered");
          obj2["instancefamily"] = obj["Instance Family"];
          obj2["instancetype"] = obj["Instance Type"];
          obj2["memory"] = obj["Memory"];
          obj2["normalizationsizefactor"] = obj["Normalization Size Factor"];
          obj2["operatingsystem"] = obj["Operating System"];
          obj2["priceperunit"] = obj["PricePerUnit"];
          obj2["vcpu"] = obj["vCPU"];
          //push desired object to array
          result.push(obj2);
      }
  }
    //call file to download this filtered data
    jsonFile(result);
}

//function to take json object data to be put into a file
function jsonFile(passedJSON) {
    var json = JSON.stringify(passedJSON); //turn js object to JSON
    
    //create a element that will download the json data
    var jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(json);
    var link = document.createElement('a');
    link.setAttribute('href', jsonStr);
    link.setAttribute('download',"filtered_json.json");
    link.click();
}