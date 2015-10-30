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
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let indexURL = NSBundle.mainBundle().URLForResource("index", withExtension: "html")
        let requestOBJ = NSURLRequest(URL: indexURL!)
        myWebView.loadRequest(requestOBJ)
    }

    @IBAction func todayBtn(sender: AnyObject) {
        let HTMLString: String! = "<h1>Today's Reading</h1>"
        myWebView.loadHTMLString(HTMLString, baseURL: nil)
    }
    @IBAction func readerBtn(sender: AnyObject) {
        let indexURL = NSBundle.mainBundle().URLForResource("index", withExtension: "html")
        let requestOBJ = NSURLRequest(URL: indexURL!)
        myWebView.loadRequest(requestOBJ)
    }
    @IBAction func settingsBtn(sender: AnyObject) {
        let HTMLString: String! = "<h1>Settings</h1>"
        myWebView.loadHTMLString(HTMLString, baseURL: nil)
    }
}

