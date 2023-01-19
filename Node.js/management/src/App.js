import "./App.css";
import Customer from "./components/Customer";

const customers = [
  {
    id: 1,
    image: "https://placeimg.com/64/64/1",
    name: "김영준",
    birsday: "990519",
    gender: "남",
    job: "대학생",
  },
  {
    id: 2,
    image: "https://placeimg.com/64/64/2",
    name: "이주연",
    birsday: "990714",
    gender: "남",
    job: "프로그래머",
  },
  {
    id: 3,
    image: "https://placeimg.com/64/64/3",
    name: "박수빈",
    birsday: "991213",
    gender: "남",
    job: "트레이너",
  },
];

function App() {
  return (
    <div>
      {customers.map((customer) => {
        return (
          <Customer
            key={customer.id}
            id={customer.id}
            image={customer.image}
            name={customer.name}
            birthday={customer.birsday}
            gender={customer.gender}
            job={customer.job}
          />
        );
      })}
    </div>
  );
}

export default App;
