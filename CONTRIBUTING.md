# Contributing to Friday Native Web Components

> Please read these guidelines before proposing a feature request or contributing code.

## :question: Got a Question?

If you have a question about using Friday Native Web Components library, please use [StackOverflow](https://stackoverflow.com)

## :exclamation: Propose a Change

Before writing any code, please [search](https://ucsd-cse112.github.io/team13/index.html) for similar existing functionality.
When proposing a change or new feature, take some time to review our core principles and overarching goals outlined below to
ensure the change or feature aligns with the core principles of Friday Native Web Components. We want to make sure all the time
and care you spend on helping make this library more awesome pays off. We're always happy and excited to see any new changes or
features that build up this library's awesomeness, no matter how small.

### :soccer: About Project Goals

Friday Native Web Components is designed to be a native web component library that strives for interoperability with other web
component libraries and inclusivity of styles and themes.  Developers use it across all devices (desktop, mobile, and tablet) and
in many modern browsers. Friday Native Web Components is committed to providing support for popular and more updated browsers.

Please keep these goals in mind when making or proposing changes.

### :shoe: Contributing Code: Step-by-Step

Follow these steps to get going.  If you are having trouble, don't be afraid to [ask for help](#got-a-question).

> PRO TIP: After `npm install`, run `npm start` to see a list of commands which can be run with `npm start <command>` (powered by [nps](https://npm.im/nps)).

1. [Install Node.js 6.x or newer](https://nodejs.org/en/download/).
    - If you're new to installing Node, a tool like [nvm](https://github.com/creationix/nvm#install-script) can help you manage multiple version installations.
    - You will need [Google Chrome](https://www.google.com/chrome/) to run browser-based tests locally.
1. Follow [Github's documentation](https://help.github.com/articles/fork-a-repo/) on setting up Git, forking and cloning.
1. Create a new branch in your working copy.  Give your branch a descriptive name, such as `issue/12345`: `git checkout -b issue/12345`.
1. Execute `npm install` to install the development dependencies.
    - Do not use `yarn install`.
    - Some optional dependencies may fail; you can safely ignore these unless you are trying to build the documentation.
    - If you're sick of seeing the failures, run `npm install --ignore-scripts`.
1. Make your changes and add them via `git add`.
    - Your changes will likely be somewhere in `lib/`, `bin/` or `browser-entry.js` (if your changes are browser-specific).
    - Unit and/or integration **tests are required** for any code change.  These live in `test/`.
    - **Do not modify** the root `mocha.js` file directly; it is automatically generated.
    - Keep your PR focused.  Don't fix two things at once; don't upgrade dependencies unless necessary.
1. Before committing, run `npm start test`.
    - This will run both Node.js-based and browser-based tests.
    - Ultimately, your pull request will be built on our continuous integration servers ([Travis CI](https://travis-ci.org/mochajs/mocha) and [AppVeyor](https://ci.appveyor.com/project/boneskull/mocha)).  The first step to ensuring these checks pass is to test on your own machine.
    - A coverage check will be sent to [Coveralls](https://coveralls.io/github/mochajs/mocha).  **A drop in code coverage % is considered a failed check**.
1. Commit your changes.
    - Use a brief message on the first line, referencing a relevant issue (e.g. `closes #12345`).
    - Add detail in subsequent lines.
    - A pre-commit hook will run which automatically formats your staged  changes (and fixes any problems it can) with ESLint and Prettier.  If ESLint fails to fix an issue, your commit will fail and you will need to manually correct the problem.
1. <a name="up-to-date"/> (Optional) Ensure you are up-to-date with Mocha's `master` branch:
    - You can add an "upstream" remote repo using `git remote add upstream https://github.com/mochajs/mocha.git && git fetch upstream`.
    - Navigate to your `master` branch using `git checkout master`.
    - Pull changes from `upstream` using `git pull upstream master`.
    - If any changes were pulled in, rebase your branch onto `master` by switching back to your branch (`git checkout <your-branch>`) then rebasing using `git rebase master`.
1. Push your changes to your fork; `git push origin`.
1. In your browser, navigate to [mochajs/mocha](https://github.com/mochajs/mocha).  You should see a notification about your recent changes in your fork's branch, with a (green?) button to create a pull request.  Click it.
1. Describe your changes in detail here, following the template.  Once you're satisfied, submit the form.
1. If you have not signed our [Contributor License Agreement](https://js.foundation/cla), a friendly robot will prompt you to do so.  A [CLA](https://cla.js.foundation/mochajs/mocha) (electronic) signature is **required** for all contributions of code to Mocha.
1. Continuous integration checks will run against your changes.  The result of these checks will be displayed on your PR.
    - If the checks fail, you must address those before the PR is accepted.
    - GitHub will indicate if there's a conflict.  If this happens, you will need to [rebase](https://help.github.com/articles/about-git-rebase/) your branch onto the `master` branch of the source repository.  **Do not `git merge`**.
    - (Optional) [Squash](https://help.github.com/articles/about-pull-request-merges/#squash-and-merge-your-pull-request-commits) your changesets.  If you have multiple changesets in your PR, they will be squashed upon PR acceptance by the Mocha team.
1. Be patient while your PR is reviewed. This can take a while. We may request changes, but don't be afraid to question them.
1. Your PR might become conflicted with the code in `master`.  If this is the case, you will need to [update your PR](#up-to-date) and resolve your conflicts.
1. You don't need to make a new PR to any needed changes.  Instead, commit on top of your changes, and push these to your fork's branch.  The PR will be updated, and CI will re-run.

Join us in the [contributors' chat](https://gitter.im/mochajs/contributors)!

## :angel: I Just Want To Help

*Excellent.*  Here's how:

- **Can you write ~~good~~ well?**  The [documentation](https://ucsd-cse112.github.io/team13/index.html) almost always needs some love.  
- **Design your thing?**  [Our site](https://mochajs.org) needs your magic touch.
- **Familiar with Friday's codebase?**  We could use your help reviewing pull requests.  Please view a [pull request](https://github.com/ucsd-cse112/team13/pulls) for review.
- **Wait--you write unit tests for *fun*?**  A PR which increases coverage is more than welcome.


 > *[Template and structure of Friday's CONTRIBUTING.md courtesy of Mochajs CONTRIBUTING.md](https://github.com/mochajs/mocha/blob/master/.github/CONTRIBUTING.md)*


## A Quick Tutorial on your First Contribution
So you want to contribute to core components? Here's what you need to know.

### The Basics

**What do we need to make a website?**

A website is mostly comprised of 3 things: the style, the structure, and the logic. For most of the web today, this would mean CSS, HTML, and JavaScript respectively. In HTML, you would write some tags such as:

```html
<button>Click Me</button>
```

And then you'd add some logic to do something on a click:

```javascript
const button = document.querySelector('button');
button.addEventListener('click', (e) => {
    console.log("I. Got. Clicked.");
});
```

And then you'd like it to be blue:

```css
button {
    color: blue;
    background: dodgerblue;
}
```

Of course, this is a simple example, but there a tons more to look into, such as animations, asynchronous procedures, and data-* attributes. I would suggest you look around.

NOTE: If you ever want to know about what some tag or style does, I would recommend you checkout this: https://developer.mozilla.org

**What is a web component?**

They are basically components we build so you can easily build a web page out of it, such as `<video>` or `<img>`. It simplifies the process and reduces the workload of having to implement your own slider or date picker. Frameworks such as React.js or Angular.js try to achieve the same thing. But because web components use native features of the web, it is universally accessible without extra files and other burdens. Because of modularity, web components can be used anywhere, with anything (even with other frameworks).

To achieve this, a component uses 3 technologies:
- The Shadow DOM to ensure encapsulation of the component.
- The template tag to lazily load the html.
- The custom tag to name it something useful.

**What is the Shadow DOM?**

A website is essentially one large tree of tags, known as the DOM. The tags you write are appended to parent nodes, and any additional nodes you add are its children.
Now the Shadow DOM is a part of the tree, a subtree, that is treated differently than the other parts. You can think of this as a separate DOM tree that is completely isolated from the main browser. Any style and logic cannot enter or exit this boundary.

This allows the web component to style freely without worry of conflict with the outside world.

**What is a template tag?**

It's a tag that doesn't execute its contents. So any style or script tags that are embedded as a child of this tag will not be executed until we actively (in JavaScript) load it. This allows our code to setup any web component initialization, such as the Shadow DOM, without it interferring with everything else before we have a chance to work with it.

**How do you get a custom tag?**

A custom tag is a tag with a custom name. As long as it has a dash in it, it is a valid custom tag name. We can use this to name our web components with a unique tag name. So we can use:

```html
<core-element>...</core-element>
```

This is usually done by registering it with the browser.

### The Good Stuff
Now, to add new features to a core-element, you can either extend or modify the existing classes.

#### Extending Core Element
You can simply extend the desired component class. All properties and functionality will be inherited. Because of this, any functions you override must call its super equivalent. For example, if you want to override `attributeChangedCallback(...)`, be sure to call `super.attributeChangedCallback(...)` with all the passed-in parameters. If you are planning to create a whole new tag with similar features, you would do this. Here's an example of a `SuperButton`.

```javascript
import CoreElement from './core-element/CoreElement';
import CoreButtonElement from './core-button/CoreButtonElement';

// These are files you create.
import TEMPLATE from './CoreSuperButtonElement.html';
import STYLE from './CoreSuperButtonElement.css';

const templateNode = CoreElement.templateNode(TEMPLATE, STYLE);

class CoreSuperButtonElement extends CoreButtonElement {
    constructor() {
        super(templateNode);
    }

    // ... your other logic / code ...
}
CoreElement.customTag('core-super-button', CoreSuperButtonElement);

export default CoreSuperButtonElement;
```

#### Modifying Core Element
Most of the time, you would want to do this to modify features to existing tags. You can edit any of the 3 files that are associated with a component class. The JavaScript handles the logic, the HTML handles the semantic structure, and the CSS handles the style. They will all be loaded together, so you can reference your class names and ids in both JavaScript and CSS, and vice versa.

##### Implementing your own attribute.
Attributes are things that allow a website builder to specify options. Things such as title or disabled on a button.

```html
<button title="I cannot be clicked" disabled>
    Even though I am a button.
</button>
```

NOTE: There are 2 types of attributes, the value and the flag. The value, as demonstrated by title, is an attribute with an associated string as its value. You can pass numbers and other content, but it must always be in the form of a string. The flag, as demonstrated by disabled, is an attribute that does not have a value, but rather is evaluated on whether it exists or not.

In most web components, you would specify attributes with `setAttribute()`, `getAttribute()`, and similar function calls. In `CoreElement`, most of this is abstracted away to allow cleaner and easier code.

This time, we define properties (props for short) that represent attributes. These properties will be evaluated at runtime on load and then it will handle all the necessary code to properly setup the web component. To define a property, we add an entry to the static getter `properties` of the class. Here is an example for a `happyTime` property.

```javascript
class CoreButtonElement extends CoreElement {
    static get properties() {
        return {
            happyTime: { type: Number }
        };
    }

    constructor()
    {
        super();
    }

    // ... the rest of the code...
}
```

The name of the attribute would be `happy-time`. It will automatically convert the `camelCase` property name to the `dash-case` attribute name. Also, it would expect the value to be of type Number. Other types such as `String`, `Object`, or `Boolean` (for flag attributes) are also supported. You can even define your own type by passing in type your own function. This function would take a string and parse it to the data type you want.

However, you may be wondering why there is a type. "I thought you said tags have attributes that only take strings?" you might say. Well you are right. `CoreElement` actually handles the conversion for you. Otherwise, everytime you access one of the attributes to compute some data, you will need to pass it through a parser before you can use it (it's a pain).

This also means you can use data like `this.happyTime` or through html or even `getAttribute('happy-time')`. All the ways you'd expect a normal tag would behave will continue as expected.

NOTE: If you want to specify a default value, you can set it in the constructor. For example:

```javascript
// ... other code ...
constructor() {
    super();
    this.happyTime = 10000;
}
// ... other code ...
```

Now that we have an attribute (and its corresponding property), let's make it do something with it.

##### Implementing a change/effect for an attribute
For any changes to the value, you can override `propertyChangedCallback()` to catch your property change. This is similar to `attributeChangedCallback()`, but it transforms its parameters to the appropriate type before letting you handle them (otherwise, they would all be strings). This function is triggered by external changes to the attribute but also with your own calls to change `happyTime` (it does prevent infinite loops if you try to update the value within the callback). This means you can perform additional logic when any attribute/property you define changes, including the setup when the value is first created. Here's a little example:

```javascript
/** @override */
propertyChangedCallback(property, oldValue, newValue) {
    switch (property) {
        case 'happyTime':
            if (newValue < oldValue)
            {
                console.log("We are now sadder.");
            }
            else
            {
                console.log("We are now happier!");
            }
            break;
        default:
    }
}
```

##### Adding your own functions
Don't repeat yourself. If you find yourself writing the same code in multiple places, try putting them in a function. Even locally scope the function by declaring a function outside the class. These will be inaccessible to anyone else but this class. Here's an example:

```javascript
function doSomeRepeatedCode() {
    // ... some repeated code ...
}

class CoreButtonElement extends CoreElement {
    // ... other code ...
    // you can now call it in any function in here!
    // ... other code ...
}
```

