---
title: 'Triangulate'
description: 'A code for rendering images with triangles for a low poly look.'
pubDate: 'Oct 02 2024'
heroImage: 'triangulate/colour_split.jpg'
tags: []
active: True
---

### Background
This is a small code written in Python that produces low poly art from input images and can be found [here](https://github.com/SimonPfeifer/Triangulate).

I remember seeing a bunch of low poly art many years ago (2017), probably because I was also messing around with Blender at the time, and wondered how something like that could be done. After a few weeks of thinking it over in my head I decided to sit down and try some ideas I had. 

It ended up being a little weekend project and in fact, this was my first GitHub repository. I thought I'd clean in up and add some extra features, more below. Having looked through the method again, and experimented with different images, I think this is a pretty neat little code.

Of course, it could use some optimisation and maybe a nicer interface maybe I'll come back to it in the future.


### Method
The general idea was simple; generate triangles from the image data and fill them with the average colour of the pixels contained within each triangle. The tricky part was generating the triangles.

I knew I wanted to use [Delauny](https://en.wikipedia.org/wiki/Delaunay_triangulation) triangulation to generate the triangles. This was straight forward using the [SciPy](https://scipy.org/) Python package. All this needs is a set of nodes to use as triangle vertices.

Now onto the tricky part, how to generate a set of nodes from the image data. Clearly these shouldn't just be randomly distributed but have some connection to the image content. In other words, I needed to extract features from a given image.

Probably one of the simplest image features to detect are corners. So that's where I started. I used [OpenCV]() for the feature detection and [FAST](https://docs.opencv.org/3.4/df/d0c/tutorial_py_fast.html) corner detection for the corner detection specifically.

This got me part of the way there but the resulting triangles were not capturing the subject in the image properly; it just didn't look good. Another issue was that the triangles were not connected to the edge of the image since no corners existed on the image frame.

To capture more features from the image data I added edges to the nodes. To detect the edges I simply used [Canny](https://docs.opencv.org/4.x/da/d22/tutorial_py_canny.html) edge detection, also part of the OpenCV library. 

To fix the framing, a set of nodes are generate at the locations of border pixels. This works pretty well.

However, after adding all these extra nodes to the triangulation, especially the edge detection, the resulting triangle set was way too large and the size of most of the triangles was tiny. My fix was to cull the number of nodes by imposing a minimum distance between them. This inadvertently also sets the minimum size of the detail present in the final image.

In summary, the method uses corner detection, edge detection and a set of image border pixels to generate a set of nodes. These nodes are culled based on a distance criterion and used as input nodes for Delauny triangulation. The pixels within each triangle are then coloured by their average value.


### Prerequisites
A Python (3+) installation and the python libraries in `requirements.txt`. These can be installed with:
```
python -m pip install -r requirements.txt
```

### Usage
The easiest way is to use the command line function with the default values. The required flags are the path to the input image, `-i`, and the path including the name of the output image, `-o`. You can use the example images provided like so:
```
python ./triangulate/main.py -i ./example/colour.jpg -o ./example/test.jpg
```

The two main options are `--corner` and `--radial` which both take integer values as input. The `--corner` flag sets the threshold for the FAST corner detection algorithm. Higher values detect fewer corners. The `--radial` flag sets the minimum radial distance between nodes during the culling stage, effectively setting the minimum size of the triangles. The value is given in pixel units. These are use like so:

```
python ./triangulate/main.py -i ./example/colour.jpg -o ./example/test_20_20.jpg --corner 20 --radial 20
```

Like with most command line tools, you can get a list of the command line flags and options with the `--help` flag:
```
python ./triangulate/main.py --help
```

One thing to note is that the performance is dependent on the image size; larger images generate more nodes which need to be culled. It's worth down sampling the image since the final low poly version contains substantially less information anyway.


### Output
Here are some examples of the method in action. These images can all be found in the `example` directory in the repository.

Here are 2 colour images with different values for the radial culling while keeping the corner threshold fixed at 25. Larger values increases the size of the triangles and effectively lowers the resolution of, or blurs, the image.
<img src="/src/content/projects/triangulate/colour_25_15.jpg" alt="Low poly image with --radial 15" class="img-left"/>
<figcaption> A 1080p colour image with --radial 15.</figcaption>

<img src="/src/content/projects/triangulate/colour_25_60.jpg" alt="Low poly image with --radial 60" class="img-right"/>
<figcaption> A 1080p colour image with --radial 60.</figcaption>
