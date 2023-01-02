<template>
  <div>
    <input type="file" @change="uploadFile" ref="file">
    <button @click="submitFile">Upload!</button>
  </div>
  <br>
  <div>
    Currency Code: <input v-model="currencyCode" placeholder="Currency Code" />
    <br>
    <br>
    Start Date: <input type="date" v-model="startDate" />
    <br>
    <br>
    End Date: <input type="date" v-model="endDate" />
    <br>
    <br>
    Status: <select v-model="selectedStatus">
      <option disabled value="">Please select one</option>
      <option>APPROVED</option>
      <option>DONE</option>
      <option>FAILED</option>
      <option>REJECTED</option>
      
    </select>
    <br>
    <br>
    <button @click="fetchData">Fetch Data</button>
    <br>Note: the filter currently works one at a time 
  </div>
  <div v-if = "responseAvailable == true">
        
        <hr>
        <p>
            <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Transaction Id</th>
                    <th>Transaction Date</th>
                    <th>Payment</th>
                    <th>Currency Code</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in result" :key="item.id">
                    <td>{{index+1}}</td>
                    <td>{{item.TransactionId}}</td>
                    <td>{{item.TransactionDate}}</td>
                    <td style="text-align: right; ">{{item.Amount}}</td>
                    <td>{{item.CurrencyCode}}</td>
                    
                    <td>{{item.Status}}</td>
                </tr>
            </tbody>
        </table>
        </p>
        <hr>
        <h1>{{ result }}</h1>
</div>
</template>

<script>
import axios from 'axios'
const VALID_TYPES = [
        'text/csv',
        'text/xml',
    ];

export default {
  name: 'TwoC2P',
  props: {
    msg: String,
  },
  data () {
    return {
      result: '',
      currencyCode:'',
      startDate:'',
      endDate:'',
      selectedStatus:'',
      responseAvailable: false,
      uploadedFile: null,
      VALID_TYPES,
      fileIsValid: null,
    };
  },
  methods: {
    uploadFile() {

      this.uploadedFile = this.$refs.file.files[0];
      this.fileIsValid = VALID_TYPES.includes(this.uploadedFile.type);
      const SIZE_LIMIT = 1;
      const fileSize = this.uploadedFile.size / 1024 / 1024; // in MB
      console.log('fileSize='+fileSize);
      if (this.fileIsValid) {
          if (fileSize > SIZE_LIMIT) {
              this.uploadedFile = null;
              alert('File size exceeds 1 MB, please choose a smaller size file.');
          }
      }
      else
      {
        this.uploadedFile = null;
        alert('File type is not supported, please choose csv or xml file only.')
      }
      
      //console.log('uploadedFile='+this.uploadedFile.type);
    },
    submitFile() {
        const formData = new FormData();
        formData.append('file', this.uploadedFile);
        const headers = { 'Content-Type': 'multipart/form-data' };
        axios.post('https://localhost:44389/api/Trans', formData, 
          { 
            method: 'POST',
            headers 
          
          }).then((res) => {
            res.data.files; // binary representation of the file
            alert('http status='+res.status); // HTTP status
            if (res.status == '200')
            {
              alert('Record added');    
            }
            else
            {
              alert('Invalid file type or error occured');
            }
           
        });
      },
		fetchData() {
      
      if (this.currencyCode=='' && this.startDate=='' && this.endDate=='' && this.selectedStatus =='')
      {
          fetch('https://localhost:44389/api/Trans', {
              method: 'GET',
             
            })
              
              .then(response => {
                response.json().then(res => {
                    console.log('res='+res);
                    this.responseAvailable = true;
                    this.result = res;
                  });
              })
              .catch(err => {
                console.error(err);
              });
      }
      else if (this.currencyCode !='' && this.startDate=='' && this.endDate=='' && this.selectedStatus==''){
        fetch('https://localhost:44389/api/Trans/byCurrencyCode/'+this.currencyCode, {
              method: 'GET',
             
            })
              
              .then(response => {
                response.json().then(res => {
                    console.log('res='+res);
                    this.responseAvailable = true;
                    this.result = res;
                  });
              })
              .catch(err => {
                console.error(err);
              });
      }
      else if (this.currencyCode =='' && this.startDate=='' && this.endDate=='' && this.selectedStatus!=''){
        fetch('https://localhost:44389/api/Trans/byStatus/'+this.selectedStatus, {
              method: 'GET',
             
            })
              
              .then(response => {
                response.json().then(res => {
                    console.log('res='+res);
                    this.responseAvailable = true;
                    this.result = res;
                  });
              })
              .catch(err => {
                console.error(err);
              });
      }
			else if (this.currencyCode =='' && this.startDate!='' && this.endDate!='' && this.selected==''){
        fetch('https://localhost:44389/api/Trans/byDateRange/'+this.startDate+'/'+this.endDate, {
              method: 'GET',
             
            })
              
              .then(response => {
                response.json().then(res => {
                    console.log('res='+res);
                    this.responseAvailable = true;
                    this.result = res;
                  });
              })
              .catch(err => {
                console.error(err);
              });
      }
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*button {
	padding: 10px 30px;
	font-size: 12px;
}*/
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

table, th, tr, td {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  border: 1px solid #ddd;
  padding: 8px;
  border-collapse: collapse;
}
</style>
