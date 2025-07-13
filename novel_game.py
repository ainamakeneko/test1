import re

TAG_BG = re.compile(r"\[background:(.+?)\]")
TAG_CHAR = re.compile(r"\[character:(.+?)\]")


def parse_novel(file_path):
    events = []
    with open(file_path, encoding='utf-8') as f:
        lines = [line.rstrip('\n') for line in f]

    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if not line:
            i += 1
            continue
        bg_match = TAG_BG.match(line)
        char_match = TAG_CHAR.match(line)
        if bg_match:
            events.append(('background', bg_match.group(1)))
            i += 1
            continue
        if line == '[bg_description]':
            i += 1
            if i < len(lines):
                events.append(('description', lines[i].strip()))
            i += 1
            continue
        if char_match:
            speaker = char_match.group(1)
            i += 1
            if i < len(lines):
                text = lines[i].strip()
                events.append(('dialogue', speaker, text))
            i += 1
            continue
        if line == '[narration]':
            i += 1
            if i < len(lines):
                events.append(('narration', lines[i].strip()))
            i += 1
            continue
        if line.startswith('第') and '章' in line:
            events.append(('chapter', line))
            i += 1
            continue
        if line.startswith('---'):
            events.append(('separator', ''))
            i += 1
            continue
        if line == '[fadeout]':
            events.append(('fadeout', ''))
            i += 1
            continue
        i += 1
    return events


def play(events):
    for event in events:
        etype = event[0]
        if etype == 'chapter':
            print('\n' + event[1])
        elif etype == 'background':
            print(f"[背景変更: {event[1]}]")
        elif etype == 'description':
            print(event[1])
        elif etype == 'dialogue':
            speaker, text = event[1], event[2]
            print(f"{speaker}: {text}")
        elif etype == 'narration':
            print(event[1])
        elif etype == 'separator':
            print('\n---\n')
        elif etype == 'fadeout':
            print('[Fade Out]')
        input()


def main():
    events = parse_novel('NOVEL_TAG.md')
    play(events)


if __name__ == '__main__':
    main()
