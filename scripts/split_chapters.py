# -*- coding: utf-8 -*-
import re

'''
This script reads katiba_intermed_1.txt and splits every chapter into a
separate .txt file. Chapter i text is sent to i.txt etc.
'''
with open('katiba_intermed_1.txt') as f:
    # iterate through lines to the second appearance
    # of SURA YA KWANZA i.e. the actual starting point
    # of the chapter
    found = 0
    while found != 2:
        line = f.readline()
        if line.find('SURA YA KWANZA') > -1:
            found += 1
    # now iterate through each line and write to file whenever
    # SURA YA is encountered

    x = 1
    total_chapters = 18
    for i in range(total_chapters):
        buffer = ''
        line = f.readline()
        while line.find('SURA YA ') == -1:
            buffer += line
            line = f.readline()
        filename = str(x) + '.txt'
        with open(filename, 'w') as ff:
            ff.write(buffer)
        x += 1
