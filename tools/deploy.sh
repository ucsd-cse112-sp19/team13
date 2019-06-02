# Get to the Travis build directory, configure git and clone the repo

# if [ "$TRAVIS_PULL_REQUEST" == "false" ] && [ "$TRAVIS_BRANCH" == "master" ]; then

	echo -e "Publishing javadoc...\n"
	cd $HOME
	git config --global user.email "travis@travis-ci.org"
	git config --global user.name "travis-ci"
	git clone --quiet --branch=docs https://${GH_TOKEN}@github.com/ucsd-cse112/team13 docs > /dev/null

	npm run docs

	# Commit and Push the Changes
	cd docs
	# git rm -rf ./javadoc
	# cp -Rf $HOME/javadoc-latest ./javadoc
	git add -f .
	git commit -m "Lastest javadoc on successful travis build $TRAVIS_BUILD_NUMBER auto-pushed to docs"
	git push -fq origin docs > /dev/null
	echo -e "Published Javadoc to /docs.\n"
  
# fi
