const email_controller = (req, res) => {
    var nodemailer = require('nodemailer');
    let total = 0
    req.body.cart.forEach(p => total += p.price * p.soluong)

    const html = `<div>
        <b>Tên: </b> ${req.body.name}<span></span>
        <br />
        <b>Số điện thoại: </b>${req.body.phone}
        <br />
        <table>
            <tr>
                <th>Stt</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
            </tr>
            ${(req.body.cart.map((p, key) => {
        return `<tr>
                        <td>${key + 1}</td>
                        <td>${p.name}</td>
                        <td>${p.soluong}</td>
                        <td style="color:red" >${new Intl.NumberFormat().format(p.price)} VNĐ</td>
                        <td style="color:red">${new Intl.NumberFormat().format(p.price * p.soluong)} VNĐ</td>
                    </tr>`
    })).join('')
        }
        </table>
        <b>Tổng tiền: </b> <span style="color:red">${new Intl.NumberFormat().format(total)} VNĐ</span>
    </div>`
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL,
            pass: process.env.PASSWORD
        }
    });

    var mailOptions = {
        from: process.env.GMAIL,
        to: "dangphuongbkhn@gmail.com,nguyendocuongbka@gmail.com",
        subject: 'ĐƠN HÀNG',
        html: html
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.status(200).json({ status: "ok" })
}

module.exports = email_controller