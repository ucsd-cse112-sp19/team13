# Get to the Travis build directory, configure git and clone the repo

# if [ "$TRAVIS_PULL_REQUEST" == "false" ] && [ "$TRAVIS_BRANCH" == "master" ]; then

  # echo -e "Publishing javadoc...\n"

  # cp -R docs/ $HOME/javadoc-latest

  # cd $HOME
  # git config --global user.email "travis@travis-ci.org"
  # git config --global user.name "travis-ci"
  # git clone --quiet --branch=jsdocs https://${GH_TOKEN}@github.com/ucsd-cse112/team13 jsdocs > /dev/null

  # ls
  # cd docs

  # git rm -rf ./javadoc
  # cp -Rf $HOME/javadoc-latest ./javadoc
  # git add -f .
  # git commit -m "Latest javadoc on successful travis build $TRAVIS_BUILD_NUMBER auto-pushed to gh-pages"
  # git push -fq origin jsdocs > /dev/null

  # echo -e "Published Javadoc to gh-pages.\n"
  
# fi
