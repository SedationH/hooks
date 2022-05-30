import { useCounter } from "../../hooks/useCounter"

const TheReactCounter = () => {
  const { cnt, increment, decrement } = useCounter()
  return (
    <div>
      <button onClick={decrement} data-testid="decrement-button">
        -
      </button>
      <button onClick={increment} data-testid="increment-button">
        +
      </button>
      <p>clicked: {cnt}</p>
    </div>
  )
}

export default TheReactCounter
