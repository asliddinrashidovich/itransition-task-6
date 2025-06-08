import FormLogin from "../components/login"

function LoginPage() {
  return (
    <div className="w-full bg-[#f1eeee] h-[100vh] flex justify-center items-center">
      <div className="max-w-[500px] w-full  shadow-2xl p-[30px]">
        <FormLogin/>
      </div>
    </div>
  )
}

export default LoginPage