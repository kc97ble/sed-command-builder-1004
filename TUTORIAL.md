# Tutorial

## General Steps

1. Create a repo and clone it.
    - Verification: after this, you can run `git status`.
1. Initialize the package.
    - Run: `npm init`
    - Verification: after this, you can see a new file `package.json`.
3. Install Typescript.
    - Guide: [DigitalOcean - How To Set Up a New TypeScript Project](https://www.digitalocean.com/community/tutorials/typescript-new-project)
    - Verification: after this, you can run `npx tsc`.
4. Install Parcel.
    - Guide: [Parcel - Building a web app with Parcel](https://parceljs.org/getting-started/webapp/)
    - Verification: after this, you can run `npx parcel srd/index.html`.
5. Install Tailwind.
    - Guide: https://tailwindcss.com/docs/guides/parcel
    - Verification: after this, open http://localhost:1234/ and the text will be formatted.
6. Install Jquery.
    - Run: `npm install jquery --save` and `npm install @types/jquery --save-dev`
    - Verification: import jquery and perform some DOM manipulation.
