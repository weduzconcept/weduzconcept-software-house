from PIL import Image
import math
from pathlib import Path

src = Path("assets/WEDUZCONCEPT_AYUNAN_SIMETRIS_KIRI_KANAN.gif")
dst = Path("assets/weduzconcept-hero-transparent.webp")
assert src.exists(), f"GIF tidak ditemukan: {src}"
gif=Image.open(src)
frames=[]
cx,cy=154.5,130.5
# Crop removes the written word and stage, retaining the medallion only.
left,top,right,bottom=48,24,261,237
for i in range(gif.n_frames):
    gif.seek(i)
    frame=gif.convert("RGBA")
    px=frame.load()
    for y in range(top,bottom):
        for x in range(left,right):
            r=math.hypot(x-cx,y-cy)
            # Preserve the entire embossed gold medallion, fade only its outer edge.
            if r<=94.5: alpha=255
            elif r>=99: alpha=0
            else:
                t=(99-r)/4.5
                alpha=round(255*t*t*(3-2*t))
            pr,pg,pb,_=px[x,y]
            px[x,y]=(pr,pg,pb,alpha)
    frames.append(frame.crop((left,top,right,bottom)))
durations=[]
for i in range(gif.n_frames):
    gif.seek(i)
    durations.append(gif.info.get("duration",100))
assert len(frames)==48, len(frames)
assert sum(durations)==4800, sum(durations)
frames[0].save(dst,save_all=True,append_images=frames[1:],duration=durations,loop=0,quality=94,method=6)
with Image.open(dst) as verify:
    assert verify.n_frames==48,verify.n_frames
    assert verify.info.get("loop",0)==0
print(f"CREATED: {dst}, {dst.stat().st_size} bytes, 48 frames, 4800 ms loop")
