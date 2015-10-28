//
//  ViewController.swift
//  myJW
//
//  Created by Apps Tester on 10/28/15.
//  Copyright © 2015 Michalik. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    @IBOutlet weak var myWebView: UIWebView!

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func readerBtn(sender: AnyObject) {
        let indexURL = NSBundle.mainBundle().URLForResource("index", withExtension: "html")
        let requestOBJ = NSURLRequest(URL: indexURL!)
        myWebView.loadRequest(requestOBJ)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let HTMLString: String! = "<h1>My Bible Reader</h1>"
        myWebView.loadHTMLString(HTMLString, baseURL: nil)
    }

}

