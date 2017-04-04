	var savedItems = [];
	var itemName, quantity, price;
    var itemsold, soldQuantity;
    var remitArray = [];

function init() {
	if (localStorage.itemsAddedToInventory) {
		savedItems = JSON.parse(localStorage.itemsAddedToInventory);
		for(var i = 0; i < savedItems.length; i++) {
			tableInv(savedItems[i].ItemName, savedItems[i].Quantity, savedItems[i].Price);
		} 
	}
}
var sum = 0;
function breakdown() {
		 if (localStorage.remitToAccounting) {
	 	remitArray = JSON.parse(localStorage.remitToAccounting);
			for (var c = 0; c < remitArray.length; c++) {
				var a = parseInt(remitArray[c].pricesold);
				sum += a;
				document.getElementById("remitThisOne").innerHTML = "Total Sales: PHP " +sum;

				remitTable(remitArray[c].itemsold, remitArray[c].soldquantity, remitArray[c].origPrice, remitArray[c].pricesold);
			}
		} else {
			document.getElementById("remitThisOne").innerHTML = "No sales at the moment";
			document.getElementById("itemR").innerHTML = "";
			document.getElementById("quantityR").innerHTML = "";
			document.getElementById("priceR").innerHTML = "";

		}

}

function low() {
	var count = 0;
		 if (localStorage.itemsAddedToInventory) {
	 	savedItems = JSON.parse(localStorage.itemsAddedToInventory);
			for (var i = 0; i < savedItems.length; i++) {
				var limitParsed = parseInt(savedItems[i].Limit);
				var quantityOrig =  parseInt(savedItems[i].Quantity);
				if (limitParsed >= quantityOrig) {
					document.getElementById("noResult").innerHTML = "Items with critical quantities";
						document.getElementById("itemQ").innerHTML = "Items";
						document.getElementById("quantityQ").innerHTML = "Quantity";
						document.getElementById("priceQ").innerHTML = "Price (PHP)";
						count++;
					limitTable(savedItems[i].ItemName, quantityOrig, savedItems[i].Price);
			} else if (count == 0){
						document.getElementById("noResult").innerHTML = "There are no items with critical quantity at the moment";

			}
		}
	}
}
function limitTable(itemName, quantityOrig, price) {
	var table = document.getElementById('lowTable');
	var row = table.insertRow();
	var itemLimCell = row.insertCell(0);
	var quantityLimCell = row.insertCell(1);
	var priceLimCell = row.insertCell(2);


	itemLimCell.innerHTML = itemName;
	quantityLimCell.innerHTML = quantityOrig;
	priceLimCell.innerHTML = price;
}

window.onload = function() {
	init();
}
function saveAddedItems() {

	itemName = document.getElementById("itemName").value;
	quantity = document.getElementById("quantity").value;
	price = document.getElementById("price").value;
	limit = document.getElementById("limit").value;

	if(isNaN(quantity) || isNaN(price) || isNaN(limit)) {
		alert('Please enter a number!');
	} else if (itemName == "" || quantity == "" || price == "" || limit == "") {
		alert("Please fill up what is needed");
	} else {
	var quantityParsed = parseInt(quantity);
	var priceParsed = parseInt(price);
	var limitParsed = parseInt(limit);

	var itemsObj = {'ItemName':itemName, 'Quantity':quantityParsed, 'Price':priceParsed, 'Limit': limitParsed};

	savedItems.push(itemsObj);
	localStorage.itemsAddedToInventory = JSON.stringify(savedItems);

	 document.getElementById("itemName").value = "";
	 document.getElementById("quantity").value = "";
	 document.getElementById("price").value = "";
	 document.getElementById("limit").value = "";

	 alert('Success! Item is added in your inventory');

	init();

	}
}

function tableInv(itemName, quantityParsed, price) {

	var table = document.getElementById('tableBody');
	var row = table.insertRow();
	var itemNameCell = row.insertCell(0);
	var quantityCell = row.insertCell(1);
	var priceCell = row.insertCell(2);
	var optionCell = row.insertCell(3);


	itemNameCell.innerHTML = itemName;
	quantityCell.innerHTML = quantityParsed;
	priceCell.innerHTML = price;
	optionCell.innerHTML = '<button>Delete</button>';
}

function onUpdateQuantity(){
	var match = false;
	var searchItem = document.getElementById('searchItemName').value.toUpperCase().trim();
	var newItemQuantity = document.getElementById('newQuantity').value.trim();
	if (isNaN(newItemQuantity)) {
		alert('Please Enter a Number in Quantity');
		document.getElementById("searchItemName").value = "";
		document.getElementById("newQuantity").value = "";

	} else if (newItemQuantity == "" || searchItem == ""){
		alert("Please fill up what is needed");
		document.getElementById("searchItemName").value = "";
		document.getElementById("newQuantity").value = "";

	} else {
		var newItemParse = parseInt(newItemQuantity);
		if (localStorage.itemsAddedToInventory) {
			savedItems = JSON.parse(localStorage.itemsAddedToInventory);
			for(var i = 0; i < savedItems.length; i++) {
				if(searchItem == savedItems[i].ItemName.toUpperCase()) {
					var oldQuantityParse = parseInt(savedItems[i].Quantity);
					oldQuantityParse += newItemParse;
					savedItems[i].Quantity = oldQuantityParse;
					alert("Item's quantity has been updated");
					match = true;
			 document.getElementById("searchItemName").value = "";
			 document.getElementById("newQuantity").value = "";



				}
			} if (!match) {
			 document.getElementById("searchItemName").value = "";
			 document.getElementById("newQuantity").value = "";

				alert('No match');
			}
			localStorage.itemsAddedToInventory = JSON.stringify(savedItems);
		}
	}	

}

function searchInv() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("invTable");
  tr = table.getElementsByTagName("tr");

 
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}


function onUpdatePrice(){
	var match = false;
	var searchItem = document.getElementById('searchItemName').value.toUpperCase().trim();
	var newItemPrice = document.getElementById('newPrice').value.trim();
	if (isNaN(newItemPrice)) {
		alert('Please Enter a Number in Price');
		document.getElementById("searchItemName").value = "";
		document.getElementById("newPrice").value = "";

	} else if (newItemPrice == "" || searchItem == ""){
		alert("Please fill up what is needed");
		document.getElementById("searchItemName").value = "";
		document.getElementById("newPrice").value = "";

	} else {
		var newItemParse = parseInt(newItemPrice);
		if (localStorage.itemsAddedToInventory) {
			savedItems = JSON.parse(localStorage.itemsAddedToInventory);
			for(var i = 0; i < savedItems.length; i++) {
				if(searchItem == savedItems[i].ItemName.toUpperCase()) {
					var oldPriceParse = parseInt(savedItems[i].Price);
					oldPriceParse = newItemParse;
					savedItems[i].Price = oldPriceParse;
					alert("Item's price has been updated");
					match = true;
			 document.getElementById("searchItemName").value = "";
			 document.getElementById("newPrice").value = "";



				}
			} if (!match) {
			 document.getElementById("searchItemName").value = "";
			 document.getElementById("newPrice").value = "";

				alert('No match');
			}
			localStorage.itemsAddedToInventory = JSON.stringify(savedItems);
		}
	}	

}

function onUpdateOnSales() {
	var arr = [];
	var match = false;
	itemsold = document.getElementById('soldItem').value.toUpperCase().trim();
	soldQuantity = document.getElementById('soldQuantity').value.trim();
	if (isNaN(soldQuantity)) {
		alert('Please Enter a Number in Quantity');
		document.getElementById("soldQuantity").value = "";

	} else if (soldQuantity == "" || itemsold == ""){
		alert("Please fill up what is needed");
	} else {
		var newQuantityParse = parseInt(soldQuantity);
		if (localStorage.itemsAddedToInventory) {
			savedItems = JSON.parse(localStorage.itemsAddedToInventory);
			for(var i = 0; i < savedItems.length; i++) {
				if(itemsold == savedItems[i].ItemName.toUpperCase()) {
					var origQuantityParse = parseInt(savedItems[i].Quantity);
					var limitParsed1 = parseInt(savedItems[i].Limit);
					origQuantityParse -= newQuantityParse;
					savedItems[i].Quantity = origQuantityParse;
		      if (origQuantityParse <= limitParsed1){
					    savedItems[i].Quantity = origQuantityParse;
                        alert("Item "+ itemsold +" has been sold\nItem " + itemsold + " is critical in quantity");                                             
                      
                    } else {

                        alert("Item "+ itemsold +" has been sold");
					    savedItems[i].Quantity = origQuantityParse;
                    }
					match = true;
			 document.getElementById("soldItem").value = "";
			 document.getElementById("soldQuantity").value = "";


				}
			}
			 if (!match) {
			 document.getElementById("soldQuantity").value = "";

				alert('No match');
			}
						localStorage.itemsAddedToInventory = JSON.stringify(savedItems);

		}

				if (localStorage.itemsAddedToInventory) {
		
			savedItems = JSON.parse(localStorage.itemsAddedToInventory);
			for(var i = 0; i < savedItems.length; i++) {
				if(itemsold == savedItems[i].ItemName.toUpperCase()) {
					var origPriceParse = parseInt(savedItems[i].Price);
					var priceO = parseInt(savedItems[i].Price);
					var quantitySold = newQuantityParse;
						match = true;
						origPriceParse *= quantitySold;
						arr[i] = origPriceParse;
						if(localStorage.remitToAccounting !== undefined) {
							remitArray = JSON.parse(localStorage.remitToAccounting);


				}
			}

		}	
			if (!match) {
			 		document.getElementById("soldQuantity").value = "";
						
			} else {						
				var remitObj = {'itemsold': itemsold.toLowerCase(), 'soldquantity': quantitySold, 'origPrice': priceO, 'pricesold': origPriceParse};

				remitArray.push(remitObj);
				localStorage.remitToAccounting = JSON.stringify(remitArray);
			}
		}
	}	

}

 
function remitTable(itemsold, quantitySold, priceO, pricesold) {

	var table = document.getElementById('remitTable');
	var row = table.insertRow();
	var itemsoldCell = row.insertCell(0);
	var quantitySoldCell = row.insertCell(1);
	var priceOrigSoldCell = row.insertCell(2);
	var priceSoldCell = row.insertCell(3);


	itemsoldCell.innerHTML = itemsold;
	quantitySoldCell.innerHTML = quantitySold;
	priceOrigSoldCell.innerHTML = priceO;
	priceSoldCell.innerHTML = pricesold;
}


