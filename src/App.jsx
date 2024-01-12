import { Textarea } from './components/ui/textarea';
import { CarouselCard } from './content/Carousel';
import { Button } from './components/ui/button';
import { Label } from './components/ui/label';
import { MainNav } from './components/main-nav';
import { Input } from './components/ui/input';

function App() {
  return (
    <>
      <MainNav />
      <div className="container mx-auto m-10 flex flex-col items-center">
        <div className="mt-5 flex lg:flex-row pb-5">
          <Input placeholder="Enter your query here!" className="w-full mr-3" />
          <Button className="lg:w-auto">Submit</Button>
        </div>

        <CarouselCard />
        <Label htmlFor="message">SQL Code</Label>
        <Textarea placeholder="Generated SQL Code will appear here!" className="mt-8 w-full" />
      </div>
    </>
  );
}

export default App;