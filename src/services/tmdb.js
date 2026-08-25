const token = import.meta.env.VITE_TMDB_TOKEN;
const baseUrl = "https://api.themoviedb.org/3";

const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
    accept: "application/json",
  },
};

export async function getAPI(endpoint) {
  try {
    const response = await fetch(`${baseUrl}/${endpoint}`, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}
