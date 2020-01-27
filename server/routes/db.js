const {Client} = require('pg')
const movies = require('../../src/data/movies')
const client= new Client({
    user:"postgres",
    password:"admin",
    host:"127.0.0.1",
    port:5432,
    database:"reflix"
})
client.connect()
.then(()=> console.log("connected succesfully"))
.catch((e)=> console.log(e))


const query= async ()=>{
    let i=0
  for(let m of movies.movies)
  {
      if(i==88)
      return
      console.log(i)
      try{
          
        //   let result=await client.query(`INSERT INTO public.movies(
        //       title, year, runtime, genres, director, image, "isRented",actors)
        //       VALUES ('${m.title}', '${m.year}', '${m.runtime}',
        //       ARRAY ['${m.genres}'], '${m.director}', '${m.posterUrl}', '${m.isRented}','${m.actors}')`)
        //       console.log(result)
        await client.query(`UPDATE public.movies
                  SET plot='${m.plot}'
                  WHERE id='${i+1419}' `)
      }
      catch(e)
      {
          console.log(e)
      }
      i++
  }
}
console.log(movies.movies.length)
query()
