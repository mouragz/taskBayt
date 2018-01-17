import React from 'react';
import $ from 'jquery';
import { Doughnut, Bar, Line } from 'react-chartjs-2';

const componentsCharts = {
  'Line': Line,
  'Doughnut': Doughnut,
  'Bar': Bar
}

class Layout extends React.Component {

  constructor() {
    super();
    this.state = {
      priority: [],
      charts: [null,null,null],
      types: [],
      loading: [false,false,false]
    }
  }

  componentDidMount() {
    var self = this;
    function getCharts() {
      $.ajax({
        // please check all of them , each one have a certain priority ..
        //url: "https://my-json-server.typicode.com/mouragz/priorityData/priority", // Line , Doughnut , Bar
        //url: "https://my-json-server.typicode.com/mouragz/priorityData1/priority", // Bar , Doughnut , Line
        url: "https://my-json-server.typicode.com/mouragz/priorityData2/priority", // Doughnut , Bar , Line 
        type: 'GET',
        dataType: 'json',
        error: (err) => {
          console.log("error ", err);
        },
        success: (data) => {
          self.setState({ priority: data })
          var names = Object.values(self.state.priority[0])
          self.setState({ types: names })
          var _self = self;
          names.map((name, i) => {
            console.info(_self.state.loading[i])
            setTimeout(() => {
              $.ajax({
                url: "https://my-json-server.typicode.com/mouragz/chartsData/charts?type=" + name,
                type: 'GET',
                dataType: 'json',
                error: (err) => {
                  console.log("error ", err);
                },
                success: (data) => {
                  console.log("success chart", data);
                  delete data[0].type;
                  let charts = _self.state.charts;
                  let loading = _self.state.loading;
                  charts[i]= data[0];
                  loading[i]=true;
                   _self.setState({
                     charts: charts,
                     loading: loading
                   });
                }
              });
            }, (i + 1) * 2 * 1000);
          });
        }
      });
    }
    getCharts();
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="chart-container" >
            {
             
              this.state.charts.map((chart, i) =>(
              this.state.loading[i] ?
                  React.createElement(componentsCharts[this.state.types[i]],
                    {
                      key: i,
                      data: this.state.charts[i],
                     
                    },
                    null)
                    : <h1 key={i}> loading ...</h1>
                  )
              )
             
            }
          </div>
        </div>
      </div>
    );
  }
}
export default Layout;
