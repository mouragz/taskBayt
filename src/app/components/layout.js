import React from 'react';
import $ from 'jquery';

import { Doughnut , Bar, Line} from 'react-chartjs-2';

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      charts: [],
      types : ['Line','Doughnut','Bar']
    }
  }

  componentDidMount() {
    var _this = this;
    function getData(name) {
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: "https://my-json-server.typicode.com/mouragz/chartsData/charts?type=" + name,
          type: 'GET',
          dataType: 'json',
          error: function (err) {
            console.log("error ", err);
            reject(err);
          },
          success: function (data) {
            console.log("success");
            console.log(data);
            delete data[0].type;
            resolve(data);
          }
        });
      });
    }
    var printResult = (results) => {
      console.log("Results = ", results);
      _this.setState({ charts: results });
    }

    function main() {
      Promise.all(
        [getData('Line'), getData('Doughnut'), getData('Bar')]
      ).then(printResult);
    }
    main();
  }
  
  render() {
    console.log("this is charts[0]"+JSON.stringify(this.state.charts[0]))
    var arrCharts = [Line,Bar,Doughnut]
    if(this.state.charts==null || this.state.charts == undefined || this.state.charts.length==0)
    return null;
    return (
      <div>
        <div className="container">
          <div className="chart-container">
          {
            this.state.types.map((type, i) =>
            React.createElement(arrCharts[i],{
                key:i,
                data: this.state.charts[i][0]
               }
             ,null
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