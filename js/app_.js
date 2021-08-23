function makePlots(id) {
    d3.json("samples.json").then((sampledata) =>{
        console.log(sampledata)
        var otuIds = sampledata.samples[0].otu_ids;
        console.log(otuIds)
        var sampleValuesBar = sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValuesBar)
        var otuLabelsBar = sampledata.samples[0].otu_labels.slice(0,10);
        console.log(otuLabelsBar)
        var sampleValuesBub = sampledata.samples[0].sample_values;
        console.log(sampleValuesBub)
        var otuLabelsBub = sampledata.samples[0].otu_labels;
        console.log(otuLabelsBub)
 
 
        var top10 = (sampledata.samples[0].otu_ids.slice(0,10)).reverse();
        
        var plotID = top10.map(d => "OTU " + d);
        console.log(`OTU IDS: ${plotID}`)
 
        console.log(`OTU Labels: ${otuLabelsBar}`)
 
        var trace1 = {
            x: sampleValuesBar,
            y: plotID,
            text: otuLabelsBar,
            marker: {
            color: 'blue'},
            type: "bar",
            orientation: "h",
        };
 
        var barData = [trace1];
 
        var barLayout = {
            title: "Top 10 OTU's per Individual",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
 
     Plotly.newPlot("bar", barData, barLayout);
 
     var trace2 ={
         x: otuIds,
         y: sampleValuesBub,
         mode: "markers",
         marker: {
             size: sampleValuesBub,
             color: otuIds
         },
         text: otuLabelsBub
     };
     
     var bubLayout = {
         xaxis:{title: "OTU ID"},
         height: "500",
         width: "1200"
     };
     
     var bubData = [trace2];
     
     Plotly.newPlot("bubble", bubData, bubLayout)
     });
 }
 
 function demoInfo(id) {
 
     d3.json("samples.json").then((data)=> {
         var demoData = data.metadata;
         console.log(demoData)
     
         var getId = demoData.filter(meta => meta.id.toString() === id)[0];
     
         var demographicInfo = d3.select("#sample-metadata");
     
         demographicInfo.html("");
     
         Object.entries(getId).forEach((key)=> {
             demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
         });
     });
     
     }
 
 function optionChanged(id) {
     makePlots(id);
     demoInfo(id);
 }
 
 function popDashboard(id) {
 
     var dropDownMenu = d3.select("#selDataset");
         
     d3.json("samples.json").then((data)=> {
         console.log(data)
         
         data.names.forEach(function(name) {
             dropDownMenu.append("option").text(name).property("value");
         });
         
         makePlots(data.names[0]);
         demoInfo(data.names[0]);
     });
     }
         
 popDashboard();