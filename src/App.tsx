import { ThemeProvider } from 'styled-components'
import { Button } from "./Components/Button";

export function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <Button variant="primary" />
      <Button variant="secondary"/>
      <Button variant="success"/>
      <Button variant="danger"/>
      <Button />
    </div>
  );
}