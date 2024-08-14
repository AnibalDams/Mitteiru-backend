import database from "../libs/db";



export class Anime {
  id: number;
  name: string;
  japaneseName: string;
  synopsis: string;
  releaseYear: string;
  studio: string;
  cover: string;
  image: string;
  onGoing: number;
  horizontalImage: string;
  genres: string[];
  public constructor(
    id: number=0,
    name: string="",
    japaneseName: string="",
    synopsis: string="",
    releaseYear: string="",
    studio: string="",
    cover: string="",
    image: string="",
    onGoing: number=0,
    horizontalImage: string="",
    genres: string[]=[""]
  ) {
    this.id = id;
    this.name = name;
    this.japaneseName = japaneseName;
    this.synopsis = synopsis;
    this.releaseYear = releaseYear;
    this.studio = studio;
    this.cover = cover;
    this.image = image;
    this.onGoing = onGoing;
    this.horizontalImage = horizontalImage;
    this.genres = genres;
  }
  async createTable() {
    try {
      let query = database.query(`CREATE TABLE Animes(
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name VARCHAR(255) NOT NULL,
                        japanese_name VARCHAR(255) NOT NULL,
                        synopsis TEXT NOT NULL,
                        release_year VARCHAR(255) NOT NULL,
                        studio VARCHAR(255) NOT NULL,
                        cover TEXT NOT NULL,
                        image TEXT NOT NULL,
                        horizontal_image TEXT NOT NULL,
                        on_going TINYINT)`);
      query.run();
      return { message: "The Animes table has already been created" };
    } catch (error) {
      console.error(error);
      return { message: "An error has occurred" };
    }
  }

  async new() {
    const createAnimeQuery = database.query(`
            INSERT INTO Animes(name,japanese_name,synopsis,release_year,studio,cover,image,horizontal_image,on_going) VALUES($name,$japanese_name,$synopsis,$release_year,$studio,$cover,$image,$horizontal_image,$on_going)`);
    try {
      let create = createAnimeQuery.run({
        $name: this.name,
        $japanese_name: this.japaneseName,
        $synopsis: this.synopsis,
        $release_year: this.releaseYear,
        $studio: this.studio,
        $cover: this.cover,
        $image: this.image,
        $horizontal_image: this.horizontalImage,
        $on_going: this.onGoing,
      });
      for (let i = 0; i < this.genres.length; i++) {
        const genre = this.genres[i];
        const doesTheGenreExistQuery = database.query(
          `SELECT id FROM Genre WHERE name=$name`
        );
        const doesTheGenreExist = doesTheGenreExistQuery.all({$name:genre});
        console.log(doesTheGenreExist.length >0?true:false);
      }
      return;
    } catch (error) {
      console.error(error);
      return { message: "An error has occurred while creating an Anime" };
    }
  }
}


