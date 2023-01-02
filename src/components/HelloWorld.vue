<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="fetchData">Fetch Data</button>
    
  </div>
  <div id="app_model" class="experiment-block">
	  <p>{{ value }}</p>
	  <input v-model="value" />
	</div>
  <div v-if = "responseAvailable == true">
        <hr>
        <p>
            <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Product Id</th>
                    <th>Name</th>
                    <th>Unit Price</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in result" :key="item.id">
                    <td>{{index+1}}</td>
                    <td>{{item.productId}}</td>
                    <td>{{item.name}}</td>
                    <td style="text-align: right; ">{{item.unitPrice}}</td>
                    <td>{{item.description}}</td>
                </tr>
            </tbody>
        </table>
        </p>
        <hr>
</div>
</template>

<script>
export default {
  name: 'CityFM',
  props: {
    msg: String,
  },
  data () {
    return {
      result: '',
      responseAvailable: false,
      value = 'some data value',
    };
  },
  methods: {
		fetchData() {
      let data = 'API-VKD8S32XZT9M2X8';

			fetch('https://localhost:44376/api/product?apikey='+data, {
				method: 'GET'
			})
				
        .then(response => {
					response.json().then(res => {
              //console.log('res='+res);
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
	padding: 20px 60px;
	font-size: 18px;
}
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
