> Make the world a better place.
> -- [Silicon Valley S01E03](https://en.wikipedia.org/wiki/List_of_Silicon_Valley_episodes#Season_1_(2014))
---

[![YJG-Calculator-Webapp](/Screenshots/Screenshot_2018-07-09_14-27-48.png)](TBD)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/FeynmanDNA/MakeTheWorldABetterPlace/blob/master/LICENSE)

# YJG-Calculator-Webapp
This is an online calculator that calculates the DNA extension, linking number change, and structural state of DNA under given force and torque constraints, with DNA interactions with protein complexes and other DNA-inserts.

## Usage
![screenshot1](/Screenshots/Screenshot_2018-07-09_14-27-01.png)

![screenshot2](/Screenshots/Screenshot_2018-07-09_14-44-16.png)

![screenshot3](/Screenshots/Screenshot_2018-07-09_14-37-41.png)

![screenshot4](/Screenshots/Screenshot_2018-07-09_14-39-05.png)

## Frontend
* React/Mobx/React-router, bootstrapped with Create-react-app + react-app-rewire-less, react-app-rewired, react-app-rewire-mobx
* UI-library: Ant-design
* Data visualization: React-vis
* Pdf viewer: React-pdf
* Ajax requests: Axios

## Backend
Flask and the [DNA transfer matrix calculator](https://bitbucket.org/FeynmanDNA/yjg-cpp-calculator/src/master/) (hosted in Bitbucket)

## Deployment
Nginx with Gunicorn+ufw+supervisor

## Theoretical papers
The underlying DNA transfer matrix calculator is based on the series of theoretical papers from Yan Jie's group:
- **Transfer-matrix calculations of DNA polymer micromechanics under tension and torque constraints** AK Efremov, RS Winardhi, J Yan, in *Physical Review E* 2016 ([link](https://www.physics.nus.edu.sg/~biosmm/Publications/PRE2016.pdf))
- **Theoretical Methods for Studying DNA Structural Transitions under Applied Mechanical Constraints** AK Efremov, RS Winardhi, J Yan, in *Polymers* 2017 ([link](http://www.mdpi.com/2073-4360/9/2/74))
- **Transfer-matrix calculations of the effects of tension and torque constraints on DNA–protein interactions** AK Efremov, J Yan, in *Nucleic Acids Research* 2018 ([link](https://academic.oup.com/nar/advance-article/doi/10.1093/nar/gky478/5033546))

# Contributors for this webapp
- Fullstack: Yang Kaiyuan and Olafs Vandans
- Backend: Ladislav Hovan
- Frontpage artwork: Artem Efremov
- C++ calculator: Artem Efremov and Ladislav Hovan
- Theoretical and UX: Yan Jie
- Tester and misc: Lu Chen, Tang Qingnan ...

and countless Stackoverflow and tech forums (credits are given in the code),

**and you!** Please feel free to help improve this open source project as much as your time and interest allow.
