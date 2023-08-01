package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

const API_END_POINT = "http://localhost:3000/getSum?counter=5";

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

func main() {
	data, err := getHttpRequest();

	if err != nil {
		fmt.Println("Error response from the request :(");
		fmt.Println(err);
		return;
	}
	fmt.Println("http Response :)");
	fmt.Println(string(data));
	return;

}