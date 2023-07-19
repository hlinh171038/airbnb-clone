import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import EmptyState from './components/EmptyState';
import getListing, { IListingsParams } from './actions/getListing';
import getCurrentUser from './actions/getCurrentUser';
import ListingCard from './components/llistings/ListingCard';

interface HomeProps {
  searchParams : IListingsParams
}

const Home = async ({searchParams}:HomeProps) =>{
  const listing = await getListing(searchParams);
  const currentUser = await getCurrentUser()
  // const isEmpty = true;
   

  if(listing.length === 0){
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
        <div className='
          pt-24
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        '
        >
          {listing && listing.map((list:any)=>{
            return (
             <ListingCard
              currentUser={currentUser}
              key={list.id}
              data={list}
              />
            )
          })}
        </div>

      </Container>
    </ClientOnly>
  )
}

export default Home
