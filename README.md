[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Ecommerce][product-screenshot]](https://ecommercespark.herokuapp.com/)

This project is made for "Spark school" web-development course. In this project I've created some basic features for Ecommerce platform.
Project is fully open source, feel free to use any of these features for your project.

### Built With

Technologies I used for making this project:
* [Node](https://nodejs.org)
* [Vue](https://vuejs.org/)
* [Vuex](https://vuex.vuejs.org/)
* [Mocha](https://mochajs.org/)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

Before cloning project make sure to install VUE Cli.
* npm
  ```sh
  npm install -g @vue/cli
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/tarikbrt2/Ecommerce-Spark.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your SECRET in `.env`
   ```JS
   SECRET=yoursecret;
   ```
3. Run server and client side simultaneously
   ```sh
   npm run dev
   ```

### Unit testing

After running unit testing, please make sure to change e-mail for unregistered account and number of registered accounts.
After every single test, new account will be registered and there will be plus one customer account.
To run unit testing on backend API, please navigate to root folder and run following command:
* npm
  ```sh
  npm run test
  ```



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Tarik Mehinagić - [@tarikbrt](https://twitter.com/tarikbrt) - tarik@2trom.com

Project Link: [https://github.com/tarikbrt2/Ecommerce-Spark](https://github.com/tarikbrt2/Ecommerce-Spark)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Choose an Open Source License](https://choosealicense.com)
* [Font Awesome](https://fontawesome.com)





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/tarikbrt2/Ecommerce-Spark.svg?style=for-the-badge
[contributors-url]: https://github.com/tarikbrt2/Ecommerce-Spark/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/tarikbrt2/Ecommerce-Spark.svg?style=for-the-badge
[forks-url]: https://github.com/tarikbrt2/Ecommerce-Spark/network/members
[stars-shield]: https://img.shields.io/github/stars/tarikbrt2/Ecommerce-Spark.svg?style=for-the-badge
[stars-url]: https://github.com/tarikbrt2/Ecommerce-Spark/stargazers
[issues-shield]: https://img.shields.io/github/issues/tarikbrt2/Ecommerce-Spark.svg?style=for-the-badge
[issues-url]: https://github.com/tarikbrt2/Ecommerce-Spark/issues
[license-shield]: https://img.shields.io/github/license/tarikbrt2/Ecommerce-Spark.svg?style=for-the-badge
[license-url]: https://github.com/tarikbrt2/Ecommerce-Spark/blob/master/LICENSE.txt
[product-screenshot]: images/image.png
