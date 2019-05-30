import json
import os

def main():
    with open('coverage/coverage-final.json') as infile:
        # Import coverage report as a dictionary.
        coverage = json.load(infile)
        for file_name in coverage:
            # Completely remove statements and branches.
            coverage[file_name]["s"].clear()
            coverage[file_name]["b"].clear()
            # For functions, remove if we can find this function
            # being called from a test file.
            keys = list(coverage[file_name]["f"])
            for fn_num in keys:
                fn_name = coverage[file_name]["fnMap"][fn_num]["name"]
                # If it is an anonymous function, we can't name it.
                if search_in_test(fn_name) or 'anonymous' in fn_name:
                    coverage[file_name]["f"][fn_num] = 1

    # Stick the json back into the original file. 
    with open('coverage/coverage-final.json', 'w') as outfile:
        json.dump(coverage, outfile)

# Used for finding a string (or in our case, a function name) in test dir.
def search_in_test(fn_name):
    # Get each file name in test
    for file_name in os.listdir(path='test'):
        # Open that file.
        f = open('test/' + file_name)
        cur_line = f.readline()

        # See if we can find the string in the line.
        while cur_line:
            if cur_line.find(fn_name) != -1:
                return True
            cur_line = f.readline()

    return False

if __name__ == '__main__':
    main()
