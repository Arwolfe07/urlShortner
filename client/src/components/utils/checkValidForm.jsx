export const checkValidForm = (email, password) => {
    const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    if (!isEmailValid) return "Email ID is not valid";
    if (!isPasswordValid) return "Password must be 8 characters containing atleast one number and alphabet";

    return null;
}

export const checkUsername = (username) =>{
    if(!username) return "Enter a Username to proceed";
}