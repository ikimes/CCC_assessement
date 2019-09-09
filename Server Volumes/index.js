$(document).ready(function() {
    //ajax to retrieve local file
    $.ajax({
        type: "GET",
        url: "data.txt",
        dataType: "text",
        success: function(response){
            //parse response to JSON
           var data = JSON.parse(response);
           var t2Micro = 0;
           //loop through data and find all t2.micro
           for (i=0;i < data.length; i++){
               if (data[i].instance_type == "t2.micro"){
                   console.log("t2.micro: ", data[i]);
                   //loop through and sum the volumes
                    for (u=0;u < data[i].volumes.length;u++){
                        t2Micro+= data[i].volumes[u].volume_size;
                    }
               }
           }

           console.log("Total: ", t2Micro);
            var total = document.createElement('h1');
            total.innerHTML = `Total: ${t2Micro}`;
            document.body.append(total);
        }
    })
})