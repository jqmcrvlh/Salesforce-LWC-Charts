import { LightningElement, api, wire } from 'lwc';
import chartJs from '@salesforce/resourceUrl/chartJs';
import { loadScript } from 'lightning/platformResourceLoader';
import getEco from '@salesforce/apex/BuscaEconomia.getEco';

export default class ChartLabEconomia extends LightningElement {
    
    isChartJsInitialized;
    chart;
    @api recordId;
    datasets = [];
    dataEconomia = [];  
 
    @wire(getEco)    
    wiredUso({ error, data }) { 
        if (data) {
            console.log(data);            
            data.forEach(element => {
                if (element.Account__c == this.recordId) {
                    this.dataEconomia.push(element.Economia__c);
                }
            });
            console.log(this.dataEconomia);   
            this.datasets = this.dataEconomia;
            console.log(this.datasets);            
        } else if (error) {
            console.log("O Erro foi :" + error);         
            
        }
    }


  
    
    renderedCallback() {
        if (this.isChartJsInitialized) {
            return;
        }
        loadScript(this, chartJs + '/chartJs/Chart.js').then(() => {
            console.log('Chart.js loaded successfully');
            this.isChartJsInitialized = true;
            this.loadCharts();
        }).catch(error => {
            console.log('Chart.js load error: ' + error.message);
        });
    }

  async  loadCharts() {
        window.Chart.platform.disableCSSInjection = true;
        const canvas = document.createElement('canvas');
        this.template.querySelector('div.chart').appendChild(canvas);
        const ctx = canvas.getContext('2d');
        this.chart = await new window.Chart(ctx, this.config(this.datasets));
    }

    config(Data) {
        return {
            type: 'line',
            data: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                datasets: [{
                    label: 'Economia R$',
                    data: Data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        // 'rgba(255, 99, 132, 1)',
                        // 'rgba(255, 99, 132, 1)',
                        // 'rgba(255, 99, 132, 1)',
                        // 'rgba(255, 99, 132, 1)'
                        // 'rgba(255, 99, 132, 0.2)',
                        // 'rgba(54, 162, 235, 0.2)',
                        // 'rgba(255, 206, 86, 0.2)',
                        // 'rgba(75, 192, 192, 0.2)',
                        // 'rgba(153, 102, 255, 0.2)',
                        // 'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        // 'rgba(255, 206, 86, 1)',
                        // 'rgba(255, 206, 86, 1)',
                        // 'rgba(255, 206, 86, 1)',
                        // 'rgba(255, 206, 86, 1)'
                        // 'rgba(255, 99, 132, 1)',
                        // 'rgba(54, 162, 235, 1)',
                        // 'rgba(255, 206, 86, 1)',
                        // 'rgba(75, 192, 192, 1)',
                        // 'rgba(153, 102, 255, 1)',
                        // 'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                legend: {
                    display: false
                },
                animation: {
                    animationScale: true,
                    animateRotate: true
                }

            }
        }
    }


}


