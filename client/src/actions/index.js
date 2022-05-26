import axios from "axios";

export function getDogs() {
  return async function (dispatch) {
    const json = await axios.get("https://pi-dogs-eosin.vercel.app/dogs");
    return dispatch({
      type: "DOGS",
      payload: json.data,
    });
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    const json = await axios.get(
      "https://pi-dogs-eosin.vercel.app/temperament"
    );
    return dispatch({
      type: "TEMPERAMENT",
      payload: json.data,
    });
  };
}

export function getDogId(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `https://pi-dogs-eosin.vercel.app/dogs/${id}`
      );
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
    const json = await axios.post("https://pi-dogs-eosin.vercel.app/dog", dog);
    return dispatch({
      type: "DOG_CREATE",
      payload: json,
    });
  };
}

export function SearchDog(payload) {
  return async function (dispatch) {
    const json = await axios.get(
      `https://pi-dogs-eosin.vercel.app/dogs?name=${payload}`
    );
    return dispatch({
      type: "SEARCH_DOG",
      payload: json.data,
    });
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
