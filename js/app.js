//Display the metadata, i.e., an individual's demographic information.
//Display each key-value pair from the metadata JSON object.

function metadataBuilder(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata; 
      var sampleArray = metadata.filter(sampleObject =>
        sampleObject.id == sample);
      var result = sampleArray[0]
      var panel = d3.select("#sample-metadata");
      panel.html("");
      Object.entries(result).forEach(([key, value]) => {
        panel.append("h6").text(`${key}: ${value}`);
      });
  
    })
  }
  
  
  function chartBuilder(oneSample) {
    d3.json("samples.json").then((data) => {
      var samples = data.samples; 
      var sampleArray = samples.filter(sampleObject => sampleObject.id == oneSample);
      //alert(sampleArray);
      var result = sampleArray[0];
      var otu_ids = result.otu_ids; 
      var otu_labels = result.otu_labels;
      var sample_values = result.sample_values;
      //alert(sample_values);
      
      //    Build Bubble Chart
      var myBubbleData = [{
        x: otu_ids, //Use otu_ids for the x values.
        y: sample_values, //Use sample_values for the y values.
        text: otu_labels, //Use otu_labels for the text values.
        mode: "markers", 
        marker: {
          size: sample_values, //Use sample_values for the marker size.
          color: otu_ids, //Use otu_ids for the marker colors.
          colorscale: "PuBu"        
        }
      }]; 
  
      //    Build bubble layout
      var myBubbleLayout = {
        title: "Bacterial Samples", 
        margin: {t:0},
        hovermode: "closest",
        xaxis: {title: "OTU ID"},
        margin: {t:30}
      };
      Plotly.newPlot("bubble", myBubbleData, myBubbleLayout); 
      
      //    Build horizontal bar chart 
      
      //with a dropdown menu to display the top 10 OTUs found in that individual.
      var myBarData = [{
        
        //Slice the first 10 objects for plotting and reverse the array.
        y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(), //Use otu_ids as the labels for the bar chart. 
        x: sample_values.slice(0, 10).reverse(), //Use sample_values as the values for the bar chart.
        text: otu_labels.slice(0, 10).reverse(), //Use otu_labels as the hovertext for the chart.
        type: "bar", 
        orientation: "h"
      }];
  
      //  Build bar layout
      var myBarLayout = {
        title: "Top 10 Bacteria", 
        margin: {t:30, l: 100}
      };
  
      Plotly.newPlot("bar", myBarData, myBarLayout);
    
    }); 
  }
  
  //populate the dropdown with the samples.json values
  function initialize() {
    var dropdown = d3.select("#selDataset"); 
    d3.json("samples.json").then((data) => {
      var sampleList = data.names; 
      sampleList.forEach((sample) => {
        dropdown.append("option").text(sample).property("value", sample); 
  
      });
      //capture sample metadata from the list
      var firstSample = sampleList[0];
      chartBuilder(firstSample); 
      metadataBuilder(firstSample);
  
    }); 
  }
  
  //Update all plots any time that a new sample is selected.
  function optionChanged(newSample){
    //alert(newSample);
    chartBuilder(newSample);
    metadataBuilder(newSample);
  }
  
  initialize(); 