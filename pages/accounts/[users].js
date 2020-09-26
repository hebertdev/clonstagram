import { useRouter } from "next/router";
import axiosInstance from "../../Helpers/axios";
UserAll.getInitialProps = async (ctx) => {
  console.log(ctx.query.users);
  let usernamesito = {
    username: ctx.query.users,
  };

  return { user: usernamesito };
};

export default function UserAll(props) {
  const router = useRouter();
  var { users } = router.query;

  console.log(props.user.username);
  return <h1> hola Soy {users} </h1>;
}
