A library that generates an interactive radar, based off of [thoughtworks.com/radar](http://thoughtworks.com/radar).

## How To Use

TODO

### Setting up your data

TODO

Give your data at least the below column headers, and put in the content that you want:

| name          | ring   | quadrant               | isNew | description                                             |
|---------------|--------|------------------------|-------|---------------------------------------------------------|
| Composer      | adopt  | tools                  | TRUE  | Although the idea of dependency management ...          |
| Canary builds | trial  | techniques             | FALSE | Many projects have external code dependencies ...       |
| Apache Kylin  | assess | platforms              | TRUE  | Apache Kylin is an open source analytics solution ...   |
| JSF           | hold   | languages & frameworks | FALSE | We continue to see teams run into trouble using JSF ... |

## Developing

All tasks are defined in `package.json`.

### Don't want to install node? Run with one line docker

     $ docker run -p 8080:8080 -v $PWD:/app -w /app -it node:10.15.3 /bin/sh -c 'npm install && npm run dev'

***Note***: If you are facing Node-sass compile error while running, please prefix the command `npm rebuild node-sass` before `npm run dev`. like this
```
npm install && npm rebuild node-sass && npm run dev
```

After building it will start on `localhost:8080`

----

## Notes

- Data format idea: https://github.com/thoughtworks/build-your-own-radar/issues/47
- Better rings idea: https://medium.com/ingeniouslysimple/building-our-own-tech-radar-1e577e48659c
