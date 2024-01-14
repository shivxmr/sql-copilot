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
      <div className="container mx-auto w-screen m-3 flex flex-col items-center">
        <div className="flex w-screen pb-5">
          <Input placeholder="Enter your query here!" className="mr-2 ml-4" />
          <Button className='mr-4'>Submit</Button>
        </div>

        {/* <CarouselCard /> */}
        <div className="grid w-screen gap-1.5">
          <Label className='ml-5' htmlFor="message">SQL Code</Label>
          <Textarea placeholder="Generated SQL code will appear here!" className='ml-4 mr-4' />
        </div>
      </div>
    </>
  );
}

export default App;