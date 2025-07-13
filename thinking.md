- signup

  - ask name in input, then ask email in input
  - send over the name and email data to backend
  - make the backend send the verifcation otp to email
  - ask for otp in input, then send over the otp data to backend
  - make the backend verify the otp
  - move to next step and ask for setting password
  - once set, move to next step and ask for username
  - once that is set, it's done
  - send the name, email, and username to the backend
  - the backend will create the user, his profile in the database
  - the user will be logged in
  - the user will be redirected to the home page

- signup flow new
  - ask email, sen to backend to send otp, ask otp in frontend, send otp to backend to verify, move to next step
  - ask name, ask username, debounce username data, once availability is confirmed send data to backend including name
  - ask password, ask confirm password, move to next step

