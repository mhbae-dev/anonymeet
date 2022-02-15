## Introduction

**Heyday aims to empower a group of users to find a day to meet up, resolving different availabilities and preferences while emphasising ease-of-access and user privacy.**

Our dev team created this app with four key features in mind:

1. **Ease to access.** Heyday is easy to use and doesn't require **any** login details, which we felt could be a barrier to uptake for some users
2. **Privacy.** To give users confidence in Heyday, we don't store any personal information (e.g. login details or an email address). We also keep users' availability private from other users, so those who value the privacy of their calendar can safely use this web-app
3. **Convenience.** Heyday captures not just availability, but also convenience and preference for certain days. All three of these are factored into our algorithm for the final result
4. **No decision making.** Heyday makes the final decision on what the best day for a meet up is, so no user decision-making is required.

We believe Heyday is the best means for a group to find the most convenient day for everyone to meet up.

![heydayScreenshot](https://user-images.githubusercontent.com/41869496/154087014-fe453606-0780-4963-a516-fc5c96146bcf.png)

## Access

Heyday is hosted on Vercel and can be accessed [here](https://heyday.vercel.app/).

## Instructions

Heyday's instructions can be found on the landing page. They are also summarised here:

1. Click the Start button on the landing page to begin. This will take you to the Setup page
2. On the Setup page, specify a date-range and a group size for a meet up. Click submit to create a Room and be taken to your Room page
3. On your Room page, open a Response Form and submit 1) when you're free and 2) what your preferences are
4. Share the Room link with the rest of your group (e.g. via email or Whatsapp) and ask them all to complete a Response Form
5. Once all response forms are submitted, Heyday will calculate the best for everyone, and this will be displayed in the Room. Users can then supply their email address (which is not stored) to receive a copy of the results

Heyday's Response Forms allow users to reguster their preferences using a rating scale: white (not available to meet up on this day), bronze (available, but it's an inconvenient day), silver (available and it's a convenient day) and gold (available and it's a preferred day).

![heydayResponseForm](https://user-images.githubusercontent.com/41869496/154086911-5d505b50-e6d6-48c2-96ce-d8536fd46c76.png)

These ratings are used to calculate the best day for everyone. It produces two results: the "most popular day" (i.e. the day with the highest rating), and the "best for everyone" day (i.e. the highest rated day when everyone's available). For larger groups, our algorithm favours the "most popular day", and will therefore exclude people if a particularly popular days arises that not everyone can attend. For smaller groups, the algorithm favours the "best for everyone" day, prioritising full attendance. This means the results display can vary depending on group size and input.

![heydayResults](https://user-images.githubusercontent.com/41869496/154087077-b8c45a53-355c-49dd-9a4e-29cd47981af8.png)

## Technologies

NOTE: the ExpressJS web framework used for this web-app is hosted on Heroku. The git repo can be viewed [here](https://github.com/Zimmja/Anon-Express).

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [React Testing Library](https://testing-library.com/)
- [Jest](https://jestjs.io/)
- [Express](https://expressjs.com/)
- [EmailJS](https://www.emailjs.com/?src=email-footer)
- [Sass](https://sass-lang.com/)
- [Figma](https://www.figma.com/)
- [Vercel](https://vercel.com/about)
- [Heroku](https://www.heroku.com/about)

## Contributors

- [Matt Zimmer](https://github.com/Zimmja)
- [Myoung Bae](https://github.com/mhbae-dev)
- [Andrew Bird](https://github.com/AndyBird88)
- [Ryan Grimes](https://github.com/RPGrimes)
- [Courtney Stow](https://github.com/Court534)
- [Ginny Thomas](https://github.com/ginnyamazed)

## License

[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)
