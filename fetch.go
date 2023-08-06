package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type Data struct {
	Counter int `json:"counter"`
}


const API_END_POINT = "http://localhost:3000/getSum";

func getHttpRequest() ([]byte, error) {
	response, err := http.Get(API_END_POINT);
	if err != nil {
		return nil, err;
	}
	defer response.Body.Close();

	data, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}

	return data, nil

}

func postRequest() {

	// Create a JSON object to be sent in the request body
	data := Data{
		Counter: 10,
	}

	// Convert the data to a JSON byte slice
	jsonData, err := json.Marshal(data)
	if err != nil {
		fmt.Println("Error marshaling JSON:", err)
		return
	}
	// fmt.Println(string(jsonData))  // json object

	// Create a new HTTP request with the JSON data as the request body
	req, err := http.NewRequest("POST", API_END_POINT, bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}

	// Set the Content-Type header to specify that we are sending JSON data
	req.Header.Set("Content-Type", "application/json")

	// Create an HTTP client and send the request
	client := http.DefaultClient
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return
	}
	defer resp.Body.Close()

	// Check the response status code and process the response body as needed
	if resp.StatusCode == http.StatusOK {
		// Process the successful response
		// ...
		var responseJSON map[string]interface{}
		err := json.NewDecoder(resp.Body).Decode(&responseJSON)
		if err != nil {
			fmt.Println("Error decoding response JSON:", err)
			return
		}
		fmt.Println(responseJSON)
	} else {
		// Handle other response codes or errors
		// ...
	}
}



func main() {
	// data, err := getHttpRequest();

	// if err != nil {
	// 	fmt.Println("Error response from the request :(");
	// 	fmt.Println(err);
	// 	return;
	// }
	// fmt.Println("http Response :)");
	// fmt.Println(string(data));
	// Comment added to check git pull
	postRequest();
	return;

}
