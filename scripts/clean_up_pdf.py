# -*- coding: utf-8 -*-
import re
import Queue as Q

# Define regexs for all the replacements needed
re_mult_spaces = r'([”,A-Za-z0-9\\.\\;\)])[ ]{2,}([“”A-Za-z0-9\\.\\;\(\)])' # replace with \1 \2
re_end_of_line_spaces = r'(\(\)[A-Za-z0-9\\.,;:“”]+)\s{1,}$' # replace with \1
re_form_feed = r'\f' # replace with ''
re_page_numbers = r'\n[ivx\b\d]{1,}\n' # replace with \n

# sed 's/\f//' FILE > NEW_FILE will find and replace all form feed characters in FILE
# in Sublime,remove arbitrary new lines by doing Find: ([A-Za-z0-9\\.,;]+)\s{1,}([\n]+) & Replace: \1\2;

# Building contents.md from txt
# if line begins with 'SURA YA':
#     line = '#' + line
# if line begins with 'SEHEMU YA':
#     line = '## ' + line

def getLink(title, number, sura_ibara=''):
  # replace spaces in sura_ibara with -s
  sura_ibara = re.sub(r'[, ]+', '-', sura_ibara)
  title = re.sub(r'[, ]+', '-', title)
  res = ''
  res += str(number) + '.html#' + sura_ibara.lower() + '-' + title.lower()
  return res

contents = ''

ct = 0
ibara = []
ptr = 0

def autocapitalize(string):
  return ' '.join([s.capitalize() for s in string.split()])

# print lines.splitlines()


def makeLine(line, sura_ibara, chnumber, ibara=False):
  if ibara:
    return '['+autocapitalize(sura_ibara)+'. '+autocapitalize(line)+']('+getLink(autocapitalize(line), chnumber, autocapitalize(sura_ibara))+')'
  else:
    return '['+autocapitalize(sura_ibara)+': '+autocapitalize(line)+']('+getLink(autocapitalize(line), chnumber, autocapitalize(sura_ibara))+')'


# makeLine(line,sura_ibara, True)



# takes the contents lines and extracts ibaras with their respective numbers
# into a dict
# only pass lines up to the end of contents
def make_ibaras(lines):
  ibaras = {}
  ibara_numbers = Q.Queue()
  ibara_sens = Q.Queue()
  # group 1 matches <Number.>
  # groups 2 & 3 match <Number. Sentence>
  # group 4 matches <Sentence>
  # regex = r'([\d]+)\.\n|([\d]+)\.\s([ \w]+)|([A-Za-z\s]+)'
  regex = r'([\d]+)\.([ \w,]*)|([A-Z][\w ,]+)'
  for line in lines.splitlines():
    m = re.search(regex, line)
    if not line.isupper() and m and line.find('(') == -1:
      matches = m.groups()
      # print matches
      if matches[0] and matches[1] == '': # line is number only
        if ibara_sens.qsize() == 0:
          ibara_numbers.put(matches[0])
        else:
          ibaras[matches[0]] = ibara_sens.get(False)
      elif matches[1] and not matches[2]: # line is number and sentence
        ibaras[matches[0]] = matches[1].strip()
      elif matches[2]: # line is sentence only
        if ibara_numbers.qsize() > 0:
          ibaras[ibara_numbers.get(False)] = matches[2]
        else:
          ibara_sens.put(matches[2])
  return ibaras

sura = {}

def make_sura_sehemu(lines):
  headers = []
  for line in lines.splitlines():
    if line.isupper():
      headers.append(line)
  return headers
# for line in lines.splitlines():
#   if line.find('UTANGULIZI') > -1:
#     contents += '1. [UTANGULIZI](' + getLink('UTANGULIZI', 0) + ')\n'
#   elif line.find('SURA YA ') > -1:
#     contents += '1. [' + autocapitalize(line) + ': '
#   elif line.find('SEHEMU YA ') > -1:
#     contents += '\t1. [' + autocapitalize(line) + ': '
#   elif not line.isupper():
#     continue
#   else:
#     contents += autocapitalize(line) + ']\n'
#   ct += 1

lines = ''
with open('katiba_intermed_1.txt') as f:
    for line in f:
      if line.find('NYONGEZA') > -1:
        break
      lines += line

# store all the ibaras in a dictionary called dit
dit = make_ibaras(lines)

headings = make_sura_sehemu(lines)
# get rid of headings at the beginning, only start with SURA YA KWANZA
headings = headings[5:]
# headings re-joining titles that are split up between multiple lines
headings_condensed = []
x = 0
while x < len(headings):
  current_line = headings[x]
  if current_line.find('SURA YA ') == -1 and current_line.find('SEHEMU YA ') == -1:
    y = x + 1
    newline = current_line
    while y < len(headings) and headings[y].find('SURA YA ') == -1 and headings[y].find('SEHEMU YA ') == -1:
      newline += ' ' + headings[y]
      y += 1
    headings_condensed.append(newline)
    x = y
  else:
    headings_condensed.append(current_line)
    x += 1

# make a printable ibara line in Markdown
def ibara_md(start, end, ch):
    x = 1
    for key in range(start,end+1):
      print('\t\t'+str(x)+'. '+makeLine(dit[str(key)], str(key), ch, True))
      x += 1

with open('suras_and_sehemus.txt', 'w') as ss:
    for line in headings_condensed:
      ss.write(line + '\n')

# suras_and_sehemus_contents = ['None']
# with open('suras_and_sehemus.txt') as ss:
#     for line in ss:
#         suras_and_sehemus_contents.append(line)
# for x in range(112,114,2):
#     title = suras_and_sehemus_contents[x]
#     text = suras_and_sehemus_contents[x+1]
#     print makeLine(text, title, 19)

ibara_md(11,22,1)

# some lines need joining
# can't have two non-SURA/SEHEMU lines next to each other
# any such lines must be joined into one line


# with open('ibara-contents.txt', 'w') as ff:

    #   print(str(key) + ': ' + dit[str(key)])
