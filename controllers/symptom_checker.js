var connection = require('../db.js');
var info = require('../disease_info.json');

Array.prototype.contains = function (elem) {
	for (var i in this) {
		if (this[i] == elem) return true;
	}
	return false;
}

function removeDuplicates(array) {
	var newArray = [];
	var j = 0, i;
	var dis_id, data;
	var idArray = [];
	for (i = 0; i < array.length; i++) {

		if (!(idArray.contains(array[i].data.id))) {
			idArray[j] = array[i].data.id;
			newArray[j] = array[i];
			j++;

		}
	}
	return newArray;
}


function symptom_check() {
	this.json_extract = function (req, res) {
		connection.init();
		connection.acquire(function (err, con) {
			var array = [];
			var len = req.body.arr.length;
			var i = 0;
			if (len > 5) {
				len = 5;
			}
			while (len > 0) {
				array[i] = req.body.arr[i].id;
				len--;
				i++;
			}
			if (array.length == 5) {
				var final_result = [];
				var query = 'SELECT * FROM diseases WHERE dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) AND dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) AND dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) AND dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) AND dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) group by dis_id;';
				con.query(query, [array[0], array[1], array[2], array[3], array[4]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {

								for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "predicted diseases" });
										break;
									}
								}

						});
					}
				});
				var query2 = 'SELECT * FROM diseases WHERE dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) AND dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) AND dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) AND dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) group by dis_id;';
				con.query(query2, [array[0], array[1], array[2], array[3]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "predicted diseases" });
										break;
									}
								}
						});
					}
				});
				con.query(query2, [array[0], array[1], array[2], array[4]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "predicted diseases" });
										break;
									}
								}

						});
					}
				});
				con.query(query2, [array[0], array[2], array[3], array[4]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "predicted diseases" });
										break;
									}
								}

						});
					}
				});
				con.query(query2, [array[0], array[1], array[3], array[4]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "predicted diseases" });
										break;
									}
								}

						});
					}
				});
				con.query(query2, [array[1], array[2], array[3], array[4]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "predicted diseases" });
										break;
									}
								}

						});
					}
				});
				var query3 = 'SELECT * FROM diseases WHERE dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) AND dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) AND dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) group by dis_id;';
				con.query(query3, [array[0], array[1], array[2]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}

				});
				con.query(query3, [array[0], array[1], array[3]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}

				});
				con.query(query3, [array[0], array[1], array[4]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}

				});
				con.query(query3, [array[0], array[2], array[3]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}
				});
				con.query(query3, [array[0], array[2], array[4]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}
				});
				con.query(query3, [array[0], array[3], array[4]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}
				});
				con.query(query3, [array[1], array[2], array[3]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}
				});
				con.query(query3, [array[1], array[2], array[4]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}
				});
				con.query(query3, [array[1], array[3], array[4]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}
				});
				con.query(query3, [array[2], array[3], array[4]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}
				});

				var query4 = 'SELECT * FROM diseases WHERE dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) AND dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) group by dis_id;';
				con.query(query4, [array[0], array[1]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}

				});
				con.query(query4, [array[0], array[2]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}

				});
				con.query(query4, [array[0], array[3]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}
				});
				con.query(query4, [array[0], array[4]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}

				});
				con.query(query4, [array[1], array[2]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}
				});
				con.query(query4, [array[1], array[3]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}
				});
				con.query(query4, [array[1], array[4]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}
				});
				con.query(query4, [array[2], array[3]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}
				});
				con.query(query4, [array[2], array[4]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}
				});
				con.query(query4, [array[3], array[4]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}

				});
				var query5 = 'SELECT * FROM diseases WHERE dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id IN (?,?,?,?,?));';
				con.query(query5, [array[0], array[1], array[2], array[3], array[4]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									//console.log(data);
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}
					res.send(removeDuplicates(final_result));
				});

				con.release();
			}
			if (array.length == 4) {
				var final_result = [];
				var query = 'SELECT * FROM diseases WHERE dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) AND dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) AND dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) AND dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) group by dis_id;';
				con.query(query, [array[0], array[1], array[2], array[3]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "predicted diseases" });
										break;
									}
								}

						});
					}
				});
				var query2 = 'SELECT * FROM diseases WHERE dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) AND dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) AND dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) group by dis_id;';
				con.query(query2, [array[0], array[1], array[2]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "predicted diseases" });
										break;
									}
								}
						});
					}

				});
				con.query(query2, [array[0], array[1], array[3]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "predicted diseases" });
										break;
									}
								}
						});
					}

				});
				con.query(query2, [array[0], array[2], array[3]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "predicted diseases" });
										break;
									}
								}
						});
					}

				});
				con.query(query2, [array[1], array[2], array[3]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "predicted diseases" });
										break;
									}
								}
						});
					}
				});

				var query3 = 'SELECT * FROM diseases WHERE dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) AND dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) group by dis_id;';
				con.query(query3, [array[0], array[1]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}

				});
				con.query(query3, [array[0], array[2]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}

				});
				con.query(query3, [array[0], array[3]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}
				});
				con.query(query3, [array[1], array[2]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}

				});
				con.query(query3, [array[1], array[3]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}
				});
				con.query(query3, [array[2], array[3]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}

				});

				var query4 = 'SELECT * FROM diseases WHERE dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id IN (?,?,?,?));';
				con.query(query4, [array[0], array[1], array[2], array[3]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}
					res.send(removeDuplicates(final_result));
				});

				con.release();

			}
			if (array.length == 3) {
				var final_result = [];
				var query = 'SELECT * FROM diseases WHERE dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) AND dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) AND dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) group by dis_id;';
				con.query(query, [array[0], array[1], array[2]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "predicted diseases" });
										break;
									}
								}
						});
					}

				});

				var query2 = 'SELECT * FROM diseases WHERE dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) AND dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) group by dis_id;';
				con.query(query2, [array[0], array[1]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "predicted diseases" });
										break;
									}
								}
						});
					}

				});
				con.query(query2, [array[0], array[2]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "predicted diseases" });
										break;
									}
								}
						});
					}

				});
				con.query(query2, [array[1], array[2]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "predicted diseases" });
										break;
									}
								}
						});
					}

				});
				var query3 = 'SELECT * FROM diseases WHERE dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id IN (?,?,?));';
				con.query(query3, [array[0], array[1], array[2]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}
					res.send(removeDuplicates(final_result));
				});

				con.release();
			}
			if (array.length == 2) {
				var final_result = [];
				var query = 'SELECT * FROM diseases WHERE dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) AND dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) group by dis_id;';
				con.query(query, [array[0], array[1]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "predicted diseases" });
										break;
									}
								}
						});
					}
					//If there is no error, all is good and response is 200OK.
				});
				var query2 = 'SELECT * FROM diseases WHERE dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id IN (?,?));';
				con.query(query2, [array[0], array[1]], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "possible diseases" });
										break;
									}
								}
						});
					}
					res.send(removeDuplicates(final_result));
				});

				con.release();
			}
			if (array.length == 1) {
				var final_result = [];
				var query = 'SELECT * FROM diseases WHERE dis_id IN (SELECT dis_id FROM symptoms_diseases WHERE sym_id = ?) GROUP BY dis_id;';
				con.query(query, array[0], function (error, results) {
					if (error) {
						res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
						//If there is error, we send the error in the error section with 500 status
					} else {
						results.forEach(function (data) {
							for (var j=0; j<105; j++) {
									if(info[j].id==data.dis_id) {
										final_result.push({ "data":info[j], "message": "predicted diseases" });
										break;
									}
								}
						});
					}
					res.send(removeDuplicates(final_result));
				});
				con.release();
			}
		});
	};
}

module.exports = new symptom_check();
