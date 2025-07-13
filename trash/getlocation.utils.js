import axios from "axios";

export async function getUserLocation() {
  if (navigator.permissions) {
    const result = await navigator.permissions.query({ name: "geolocation" });
    if (result.state === "denied") throw new Error("Permission denied");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        try {
          const res = await axios.get(
            "https://nominatim.openstreetmap.org/reverse",
            {
              params: {
                lat,
                lon,
                format: "json",
              },
            }
          );

          const { country, state, city, town, village } = res.data.address;

          resolve({
            lat,
            lon,
            country,
            state,
            city: city || town || village || "",
          });
        } catch (err) {
          reject("Reverse geocoding failed");
        }
      },
      () => reject("Geolocation denied")
    );
  });
}
