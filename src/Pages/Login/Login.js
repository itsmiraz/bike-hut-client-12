import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/UserContext";

const Login = () => {
  // userContext
  const { signIn, googleSginIn,  } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const [err, seterr] = useState("");
  const from = location.state?.from?.pathname || "/";
 



  const handleLogin = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        toast.success('Logined SuccessFully')
       

        saveUser(user.displayName,user.email)


      })
      .catch((error) => {
        console.log(error);
        seterr(error.message);
      });
  };

  const handleGoogleLogin = () => {
    googleSginIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        const type = 'Buyer'
        saveUser(user.displayName, user.email,type);
        
      })
      .catch((error) => {
        console.log(error);
        seterr(error.message);
      });
  };

  // save user to db
  const saveUser = (name, email,type) => {
    const user = { name, email,type };
    console.log("saveuser", user);  
    fetch(`http://localhost:5000/user/${email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
       
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, );
        if (data.status === 'success') {
          localStorage.setItem('bikehutAccessToken', data.data)
          setTimeout(() => {
            navigate(from, { replace: true })

        }, 300);
       }
          
        
      });
  };

  return (
    <div className="flex mb-10 justify-center h-[600px] items-center">
      <div className="w-96">
        <h1 className="text-xl text-center font-bold my-4">Login</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div>
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full my-3"
              {...register("email", { required: "Email is Reqired" })}
              placeholder="Email"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full my-3"
              {...register("password", { required: "Password is Required" })}
              placeholder="Password"
            />

            <span className="label-text">Forget Password ?</span>
          </div>
          <p className="text-red-400">
            {errors.email?.message || errors.password?.message}
          </p>
          <p className="text-red-400">{err}</p>

          <input value="Login" className="py-2 font-semibold rounded-lg bg-teal-500 text-white border none w-full my-3" type="submit" />
        </form>
        <p className="text-center font-semibold">
          New to Bike Hut ?
          <Link to="/register" className="text-teal-500">
            Create an account
          </Link>
        </p>
        <div className="divider">OR</div>
        <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Login;
