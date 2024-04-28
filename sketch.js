let color_p5 = (sketch) => {
    let red, green, blue;
    let rods, cr, cg, cb;
    let eye_size = 200;
    let canvas;


    function make_slider(min, max, x, y, size) {
        let temp = sketch.createSlider(min, max, max, 0.05);
        let cx = canvas.position().x;
        let cy = canvas.position().y;
        temp.position(x + size * 0.5 + cx, y + cy);
        temp.size(size);
        return temp;
    }

    sketch.setup = () => {
        canvas = sketch.createCanvas(1000, 600);
        red = make_slider(0, 255, 10, 10, 200);
        green = make_slider(0, 255, 10, 40, 200);
        blue = make_slider(0, 255, 10, 70, 200);
        rods = make_slider(0, 1, sketch.width - 220, 10, 200);
        cr = make_slider(0, 1, sketch.width - 220, 40, 200);
        cg = make_slider(0, 1, sketch.width - 220, 70, 200);
        cb = make_slider(0, 1, sketch.width - 220, 100, 200);
    }

    sketch.draw = () => {
        sketch.background('#180b16');

        sketch.fill(red.value(), 0, 0);
        sketch.push();
        sketch.translate(250, 7);
        sketch.rotate(sketch.PI / 4);
        sketch.rect(0, 0, 20, 20)
        sketch.pop();

        sketch.fill(0, green.value(), 0);
        sketch.push();
        sketch.translate(250, 37);
        sketch.rotate(sketch.PI / 4);
        sketch.rect(0, 0, 20, 20)
        sketch.pop();

        sketch.fill(0, 0, blue.value());
        sketch.push();
        sketch.translate(250, 67);
        sketch.rotate(sketch.PI / 4);
        sketch.rect(0, 0, 20, 20)
        sketch.pop();

        sketch.fill(255);
        sketch.text("red light", 280, 25);
        sketch.text("green light", 280, 55);
        sketch.text("blue light", 280, 85);

        sketch.text("rods", sketch.width - 300, 25);
        sketch.text("red cones", sketch.width - 300, 55);
        sketch.text("green cones", sketch.width - 300, 85);
        sketch.text("blue cones", sketch.width - 300, 115);

        sketch.text("light emmited", 20, sketch.height / 2 - eye_size * 0.6);

        sketch.text("color percived", sketch.width - 300, sketch.height - eye_size * 0.5);


        sketch.fill(red.value(), green.value(), blue.value());
        sketch.ellipse(eye_size * 0.3, sketch.height / 2, eye_size / 2, eye_size);
        sketch.rect(eye_size * 0.8, sketch.height / 2 - 10, sketch.width * 0.5, 20);
        sketch.triangle(sketch.width * 0.5 + eye_size * 0.8, sketch.height / 2 - 30, sketch.width * 0.5 + eye_size * 0.8, sketch.height / 2 + 30, sketch.width * 0.5 + eye_size * 0.8 + 50, sketch.height / 2);


        let red_filt = red.value() * (17 * cr.value() + 3 * cg.value()) / 20;
        let green_filt = green.value() * (80 * cr.value() + 86 * cg.value() + 3 * cb.value() + 80 * rods.value()) / 249;
        let blue_filt = blue.value() * (35 * cr.value() + 33 * cg.value() + 70 * cb.value() + 32 * rods.value()) / 170;


        sketch.fill(red_filt, green_filt, blue_filt);

        sketch.rect(sketch.width - eye_size * 0.95, sketch.height - eye_size * 0.85, eye_size * 0.7, eye_size * 0.7)

        sketch.fill(255);
        sketch.stroke(0, 0);
        sketch.circle(sketch.width - eye_size * 0.6, sketch.height / 2, eye_size);
        sketch.fill('#44796B');
        sketch.ellipse(sketch.width - eye_size * 0.85, sketch.height / 2, 0.45 * eye_size, 0.65 * eye_size);
        sketch.fill(0);
        sketch.ellipse(sketch.width - eye_size * 0.88, sketch.height / 2, 0.3 * eye_size, 0.45 * eye_size);

    }
}

let chimera_p5 = (sketch) => {
    function draw_box(x, y, color) {
        sketch.noStroke();
        sketch.fill(color);
        sketch.rect(x - 100, y - 100, 200, 200);
        sketch.fill(255);
        sketch.rect(x - 30, y - 7.5, 60, 15);
        sketch.rect(x - 7.5, y - 30, 15, 60);

    }

    function draw_pair(h, c1, c2) {
        draw_box(sketch.width / 2 - 150, h, c1);
        draw_box(sketch.width / 2 + 150, h, c2);
    }

    sketch.setup = () => {
        sketch.createCanvas(800, 800);
        draw_pair(150, sketch.color(255, 0, 0), sketch.color(0, 255, 0));
        draw_pair(400, sketch.color(255, 0, 0), sketch.color(0, 0, 255));
        draw_pair(650, sketch.color(0, 255, 0), sketch.color(0, 0, 255));
        sketch.noLoop();
    }
}




function sketches() {
    color_p5 = new p5(color_p5, document.getElementById("color"));
    chimera_p5 = new p5(chimera_p5, document.getElementById("chimera"));
}