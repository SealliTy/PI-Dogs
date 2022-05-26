import axios from "axios";
const BASE_URL = "https://appdogs1.herokuapp.com";

export function getDogs() {
  return async function (dispatch) {
    try {
      const json = await axios.get(`${BASE_URL}/dogs`);
      return dispatch({
        type: "DOGS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    try {
      const json = await axios.get(`${BASE_URL}/temperament`);
      return dispatch({
        type: "TEMPERAMENT",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDogId(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`${BASE_URL}/dogs/${id}`);
      return dispatch({
        type: "DOG_ID",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function dogCreate(dog) {
  return async function (dispatch) {
    try {
      const json = await axios.post(`${BASE_URL}/dog`, dog);
      return dispatch({
        type: "DOG_CREATE",
        payload: json,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function SearchDog(payload) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`${BASE_URL}/dogs?name=${payload}`);
      return dispatch({
        type: "SEARCH_DOG",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterDogsApiDb(payload) {
  return {
    type: "FILTER_DB_API",
    payload: payload,
  };
}

export function filterTemp(payload) {
  return {
    type: "FILTER_TEMP",
    payload: payload,
  };
}

export function filterPeso(payload) {
  return {
    type: "FILTER_PESO",
    payload: payload,
  };
}

export function filterAZ(payload) {
  return {
    type: "FILTER_AZ",
    payload: payload,
  };
}
